import mongoose, { Schema, type ObjectId } from "mongoose";

export interface RegistereDocument extends mongoose.Document {
  studentID: ObjectId;
  eventID: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<RegistereDocument>(
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

export const Register = mongoose.model<RegistereDocument>("Register", attendanceSchema);
