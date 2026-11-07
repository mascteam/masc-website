import mongoose, { Schema, type ObjectId } from "mongoose";

export interface BlogDocument extends mongoose.Document {
  _id: ObjectId;
  title: string;
  slug: string;
  likedBy: ObjectId[];
  likes: number; // virtual field
  blogOfMonth: boolean;
  content: string;
  bannerUrl: string;
  description: string;
  writtenBy: string;
  createdAt: Date;
  updatedAt: Date;
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
      unique: true,
      trim: true,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        deafult: [],
      },
    ],
    blogOfMonth: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    writtenBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.virtual("likes").get(function () {
  return this.likedBy.length;
});

blogSchema.set("toJSON", { virtuals: true });
blogSchema.set("toObject", { virtuals: true });

export const Blog = mongoose.model<BlogDocument>("Blog", blogSchema);
