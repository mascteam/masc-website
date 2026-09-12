import mongoose, { Schema, type ObjectId } from "mongoose";

export interface AttendanceDocument extends mongoose.Document {
  studentID: ObjectId;
  eventID: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<AttendanceDocument>(
  {
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true },
);

export const Attendance = mongoose.model<AttendanceDocument>("Attendance", attendanceSchema);
