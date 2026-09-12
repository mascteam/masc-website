import { Router } from "express";

const router = Router();

import { checkAuth } from "../middlewares/auth.middleware";

import {
  deleteEvent,
  getAllEvents,
  getEventBySlug,
  getAttendedStudents,
  getRegisteredStudents,
  hostEvent,
  markAttendanceForEvent,
  registerForEvent,
  updateEventInformation,
  getLatestEvent,
  getEventStats,
  getMarkedAttendanceData,
} from "../controllers/event.controller";

// get all events
router.get("/", getAllEvents);

// get 1 latest events
router.get("/latest", getLatestEvent);

// get one event by ID
router.get("/:slug", getEventBySlug);

// organizors can host an event
router.post("/", checkAuth, hostEvent);

// organizors can update information of a event
router.patch("/:eventID", checkAuth, updateEventInformation);

// organizors can delete a hosted event
router.delete("/:slug", checkAuth, deleteEvent);

// users to register for an hoster event
router.post("/register", checkAuth, registerForEvent);

// organizors can add attended student
router.post("/attended", checkAuth, markAttendanceForEvent);

// organizors can get the list of registerd student
router.get("/:eventID/register", checkAuth, getRegisteredStudents);

// organizors can get the list of attended students
router.get("/:eventID/attended", checkAuth, getAttendedStudents);

// organizors can get the list of attended students so far during marking attendance
router.get("/:eventID/attendance-preview", checkAuth, getMarkedAttendanceData);

// anyone can get the count of registered students and marked attendance
router.get("/:slug/stat", getEventStats);

export default router;
