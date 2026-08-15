import mongoose, { Schema, type ObjectId } from "mongoose";

export interface BlogDocument extends mongoose.Document {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;
  bannerUrl: string;
}

const blogSchema = new Schema<BlogDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);
