import { User, type UserDocument } from "../models/user.model";
import { Event } from "../models/events.model";

import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";

import { checkFilter } from "../utils/checkFilter";

import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import type { Request, Response } from "express";

import {
  addAttendedStudentSchema,
  getListSchema,
  getMarkedAttendanceDataSchema,
  hostEventSchema,
  registerStudentSchema,
  updateEventSchema,
} from "./event.schema";

import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/status-codes";

import type { ObjectId } from "mongoose";

import ExcelJS from "exceljs";
import { isAdmin, isOrganizor } from "../utils/roles";
import { Register } from "../models/registration.mode";
import { Attendance } from "../models/attendance.model";

const getLatestEvent = asyncHandler(async (req: Request, res: Response) => {
  // pagination logic
  const event = await Event.findOne().sort({ createdAt: -1 }).select("-attendedStudentsID -registerdStudentsID");

  if (!event) throw new ApiError(NOT_FOUND, "latest event not found");

  res.status(OK).json({ event, message: "events fetched successfully", success: true });
});

// get all events
const getAllEvents = asyncHandler(async (req: Request, res: Response) => {
  const events = await Event.find({ isPublic: true })
    .select("-markedStudents -registeredStudents")
    .sort({ createdAt: -1 });

  res.status(OK).json({ events, message: "events fetched successfully", success: true });
});

// get one event  by slug
const getEventBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) throw new ApiError(BAD_REQUEST, "event slug not provided");

  const event = await Event.findOne({ slug }).select("-attendedStudentsID -studentFeedbacks");
  if (!event) throw new ApiError(NOT_FOUND, "invalid event id provided, failed to fetch event");

  // TODO - hide event for users but show for organizor so make this a private route
  res.status(OK).json({ event, message: "events fetched successfully", success: true });
});

// organizors can host an event
const hostEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  //validate the payload by zod
  const {
    title,
    banner,
    date,
    venue,
    time,
    description,
    tags,
    externalLinks,
    speakers,

    allowedDepartments,
    allowedDivisions,
    allowedYears,
  } = hostEventSchema.parse(req.body);

  // get the authenticated user payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;
  if (!userID) throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");

  // check if user is has the organizor role
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");

  if (!isAdmin(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  const slug = `${title}`.trim().toLowerCase().replace(/\s+/g, "-");

  // create an event
  const event = await Event.create({
    title,
    banner,
    date,
    venue,
    time,
    description,
    tags,
    externalLinks,
    speakers,
    slug,
    allowedDepartments,
    allowedYears,
    allowedDivisions,
  });

  // send a response
  res.status(CREATED).json({ event, message: "event hosted successfully", succee: true });
});

// organizors can update information of a event
const updateEventInformation = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // get the event id from params
  const { eventID } = req.params;
  if (!eventID) throw new ApiError(BAD_REQUEST, "event id was not provided");

  // validate the body by zod
  const toUpdateData = updateEventSchema.parse(req.body);

  // get the authenticated user payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;
  if (!userID) throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");

  // check if user is has the organizor role
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  if (!isAdmin(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  if (toUpdateData.title) {
    toUpdateData.slug = `${toUpdateData.title}`.trim().toLowerCase().replace(/\s+/g, "-");
  }

  // update the event
  const event = await Event.findOneAndUpdate({ _id: eventID }, toUpdateData, { new: true });

  // send a response
  res.status(OK).json({ event, message: "event updated successfully", succee: true });
});

// organizors can delete a hosted event
const deleteEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // get the event id from params
  const { slug } = req.params;
  if (!slug) throw new ApiError(BAD_REQUEST, "event id was not provided");

  // get the authenticated user payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;
  if (!userID) throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");

  // check if user is has the organizor role
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  if (!isAdmin(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  // check if such event exist - masc client is passing slug here so im not changing the var names but fetch event by slug here
  const event = await Event.findOne({ slug });
  if (!event) throw new ApiError(NOT_FOUND, "event not found");

  // delete the event - delete using the slug
  await Event.findOneAndDelete({ slug });

  // send a response
  res.status(CREATED).json({ event, message: "event deleted successfully", succee: true });
});

//users to register for an hoster event
const registerForEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // validate the body by zod
  const { eventID } = registerStudentSchema.parse(req.body);

  // get the authenticated user payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "login to perform this action");
  const { userID } = req.user;
  if (!userID) throw new ApiError(UNAUTHORIZED, "bad request, userID is missing");

  // get user data
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");

  // check if user passes the filters
  const getFilters = await Event.findById(eventID);

  if (!getFilters) throw new ApiError(NOT_FOUND, "event does not exist");

  const canRegister =
    checkFilter(getFilters.allowedYears, user.year) &&
    checkFilter(getFilters.allowedDepartments, user.department) &&
    checkFilter(getFilters.allowedDivisions, user.division);

  if (!canRegister) throw new ApiError(NOT_FOUND, "not eligible to register");

  //check if user has already registered for the event
  const alreadyRegistered = await Register.findOne({ studentID: user._id, eventID });
  if (alreadyRegistered) throw new ApiError(CONFLICT, "user has already registered");

  // add users moodleID to event document
  const event = await Event.findOneAndUpdate(
    { _id: eventID, canRegister: true },
    {
      $addToSet: {
        registerdStudentsID: user._id,
      },
    },
    { new: true },
  );

  if (!event) throw new ApiError(INTERNAL_SERVER_ERROR, "registration's are closed by the organization");

  // add event to users registerdEvents list
  await User.updateOne(
    { _id: userID },
    {
      $addToSet: { registeredEvents: eventID },
    },
  );

  // make a registration document
  await Register.create({ studentID: userID, eventID: event._id });

  // send response
  res.status(OK).json({ event, message: "registered successfully", success: true });
});

// organizors can add attended student list
const markAttendanceForEvent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // validate the body by zod
  const { eventID, moodleID } = addAttendedStudentSchema.parse(req.body);

  // get the autheticated users payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;

  // get the users data
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid payload, failed to fetch user");

  // check is the user role is organizor
  if (user.role === "USER") throw new ApiError(UNAUTHORIZED, "cant perform this action");

  // check if user is in the  organization who hosted the event
  const eventData = await Event.findById(eventID);
  if (!eventData) throw new ApiError(404, "event not found");

  // fetch the userID of student using moodleID
  const student = await User.findOne({ moodleID });
  if (!student) throw new ApiError(NOT_FOUND, "failed to find an accounr using the provided moodleID");

  if (!isOrganizor(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  // check if student attendance is already marked
  const alreadyMarkedAttendance = await Attendance.findOne({ studentID: student._id, eventID: eventData._id });
  if (alreadyMarkedAttendance) throw new ApiError(CONFLICT, `attendance is already marked for ${student.name}`);

  // update the attended student list
  const event = await Event.findOneAndUpdate(
    {
      _id: eventID,
      registerdStudentsID: student._id,
    },
    {
      $addToSet: {
        attendedStudentsID: student._id,
      },
    },
    { new: true },
  );

  if (!event) {
    throw new ApiError(403, "Student is not registered for this event");
  }

  // make an attedance document for this event
  const markAttendance = await Attendance.create({ studentID: student._id, eventID: event._id });

  const markedStudentList = await Attendance.find({ eventID: event._id }).populate({
    path: "studentID",
    select: "name year divison department",
  });

  // send response
  res.status(OK).json({ markedStudentList, message: "attendance marked successfully", success: true });
});

const getMarkedAttendanceData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { eventID } = getMarkedAttendanceDataSchema.parse(req.params);

  // get the autheticated users payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;

  // get the users data
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid payload, failed to fetch user");

  if (!isOrganizor(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  const markedStudentList = await Attendance.find({ eventID }).populate({
    path: "studentID",
    select: "name year divison department",
  });

  // send response
  res.status(OK).json({ markedStudentList, message: "attendance marked successfully", success: true });
});

// organizors can get the list of registerd student
const getRegisteredStudents = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // validate the payload by zod
  const { eventID } = getListSchema.parse(req.params);

  // get the autheticated users payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;

  // get the users data
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid payload, failed to fetch user");

  // check is the user role is organizor
  if (!isOrganizor(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  // check if user is in the  organization who hosted the event
  const eventData = await Event.findById(eventID);
  if (!eventData) throw new ApiError(404, "event not found");

  // fetch the list
  const registrationList = await Register.find({ eventID }).populate<{ studentID: UserDocument }>({
    path: "studentID",
    select: "moodleID name department year division createdAt",
  });

  if (!registrationList) throw new ApiError(INTERNAL_SERVER_ERROR, "failed to fetch registered students list");

  // options to convert iso date into human readable date
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  // format data with serial number
  const formattedData = registrationList.map(
    ({ studentID: { moodleID, name, department, year, division }, createdAt }, index) => ({
      sr_no: index + 1,
      moodleID,
      name,
      department,
      year,
      division,
      date: createdAt.toLocaleDateString("en-IN", optionsDate),
      time: createdAt.toLocaleDateString("en-IN", optionsTime).trim().split(",")[1],
    }),
  );

  // create Excel workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Registrations");

  // define columns
  worksheet.columns = [
    { header: "Sr No", key: "sr_no", width: 10 },
    { header: "Moodle ID", key: "moodleID", width: 20 },
    { header: "Name", key: "name", width: 25 },
    { header: "Department", key: "department", width: 20 },
    { header: "Year", key: "year", width: 10 },
    { header: "Division", key: "division", width: 12 },
    { header: "Date", key: "date", width: 15 },
    { header: "Time", key: "time", width: 15 },
  ];

  // add data
  worksheet.addRows(formattedData);

  // optional: make header bold
  worksheet.getRow(1).font = { bold: true };

  // generate xlsx
  const buffer = await workbook.xlsx.writeBuffer();

  // set response headers
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=registration-list.xlsx");

  // send file
  res.send(buffer);

  // final response
  res.status(OK);
});

// organizors can get the list of attended students
const getAttendedStudents = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // validate the payload by zod
  const { eventID } = getListSchema.parse(req.params);

  // get the autheticated users payload
  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  const { userID } = req.user;

  // get the users data
  const user = await User.findById(userID);
  if (!user) throw new ApiError(NOT_FOUND, "invalid payload, failed to fetch user");

  // check is the user role is organizor
  if (user.role === "USER") throw new ApiError(UNAUTHORIZED, "cant perform this action");

  // check if user is in the  organization who hosted the event
  const eventData = await Event.findById(eventID);
  if (!eventData) throw new ApiError(404, "event not found");

  if (!isOrganizor(user.role)) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  // fetch the list and populate it
  const attendanceList = await Attendance.find({ eventID }).populate<{ studentID: UserDocument }>({
    path: "studentID",
    select: "moodleID name department year division createdAt",
  });

  // options to convert iso date into human readable date
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  // format data with serial number
  const formattedData = attendanceList.map(
    ({ studentID: { moodleID, name, department, year, division }, createdAt }, index) => ({
      sr_no: index + 1,
      moodleID,
      name,
      department,
      year,
      division,
      date: createdAt.toLocaleDateString("en-IN", optionsDate),
      time: createdAt.toLocaleDateString("en-IN", optionsTime).trim().split(",")[1],
    }),
  );

  // Create Excel workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  // Define columns
  worksheet.columns = [
    { header: "Sr No", key: "sr_no", width: 10 },
    { header: "Moodle ID", key: "moodleID", width: 20 },
    { header: "Name", key: "name", width: 25 },
    { header: "Department", key: "department", width: 20 },
    { header: "Year", key: "year", width: 10 },
    { header: "Division", key: "division", width: 12 },
    { header: "Date", key: "date", width: 15 },
    { header: "Time", key: "time", width: 15 },
  ];

  // Add rows
  worksheet.addRows(formattedData);

  // Bold headers
  worksheet.getRow(1).font = { bold: true };

  // Generate XLSX
  const buffer = await workbook.xlsx.writeBuffer();

  // Set response headers
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=attendance-list.xlsx");

  // Send file
  res.status(OK).send(buffer);
});

const getEventStats = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) throw new ApiError(BAD_REQUEST, "event slug not provided");

  const event = await Event.findOne({ slug, isPublic: true })
    .select({
      registerdStudentsID: 1,
      attendedStudentsID: 1,
    })
    .lean();

  if (!event) {
    return null;
  }

  const result = {
    regCount: event.registerdStudentsID?.length ?? 0,
    markCount: event.attendedStudentsID?.length ?? 0,
  };

  if (!event) throw new ApiError(BAD_REQUEST, "invalid event id provided, failed to fetch event");

  // TODO - hide event for users but show for organizor so make this a private route
  res.status(OK).json({ event, message: "events fetched successfully", success: true });
});

export {
  // admin controllers
  hostEvent,
  updateEventInformation,
  deleteEvent,

  // organizor controllers
  markAttendanceForEvent,
  getRegisteredStudents,
  getAttendedStudents,
  getMarkedAttendanceData,

  // user controllers
  getAllEvents,
  getEventBySlug,
  getLatestEvent,
  getEventStats,
  registerForEvent,
};
