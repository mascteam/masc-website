import type { Request, Response } from "express";
import { Blog } from "../models/blog.model";
import { createBlogSchema, updateBlogSchema } from "./blog.schema";
import ApiError from "../utils/apiError";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/status-codes";
import { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";

export const getLatestBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findOne().sort({ createdAt: -1 });

  if (!blog) throw new ApiError(NOT_FOUND, "latest blog not found");

  res.status(OK).json({ blog, message: "blog fetched successfully", success: true });
});

export const getAllBlogs = asyncHandler(async (_: Request, res: Response) => {
  const blogs = await Blog.find({ blogOfMonth: false }).sort({ createdAt: -1 });
  const blogOfTheMonth = await Blog.find({ blogOfMonth: true }).sort({ createdAt: -1 });
  res.status(200).json({
    blogs,
    blogOfTheMonth,
  });
});

export const getAllBlogOfMonth = asyncHandler(async (_: Request, res: Response) => {
  const blogs = await Blog.find({ blogOfMonth: true }).sort({ createdAt: -1 });

  res.status(200).json({
    blogs,
  });
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) throw new ApiError(BAD_REQUEST, "slug was not provided in request");
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.status(200).json({
    blog,
  });
});

export const createBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const validated = createBlogSchema.parse(req.body);

  if (!req.user || !req.user.userID) {
    throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  }

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = ["ADMIN", "ORGANIZOR"].includes(user.role);

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const slug = validated.title.split(" ").join("-").toLocaleLowerCase();

  //check if this slug is already present in the db
  const BlogAlreadyExist = await Blog.findOne({ slug });

  if (BlogAlreadyExist) throw new ApiError(CONFLICT, "blog with this slug already exist");

  const blog = await Blog.create({ ...validated, slug });

  res.status(201).json({
    blog,
  });
});

export const updateBlogBySlug = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const validated = updateBlogSchema.parse(req.body);

  const { slug } = req.params;
  if (!slug) throw new ApiError(BAD_REQUEST, "no slug provided to update");

  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = ["ADMIN", "ORGANIZOR"].includes(user.role);

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  let newSlug = slug;
  if (validated.title) {
    newSlug = validated.title.split(" ").join("-").toLocaleLowerCase();
  }

  const blog = await Blog.findOneAndUpdate(
    { slug },
    { ...validated, slug: newSlug },
    {
      new: true,
    },
  );

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.status(200).json({
    blog,
  });
});

export const deleteBlogBySlug = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user || !req.user.userID) {
    throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  }

  const { slug } = req.params;

  if (!slug) throw new ApiError(BAD_REQUEST, "no slug provided to delete");

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = user.role === "ADMIN";

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const blog = await Blog.findOneAndDelete({ slug });

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.status(200).json({
    message: "Blog deleted",
  });
});

export const likedBlogBySlug = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user || !req.user.userID) {
    throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  }

  const { slug } = req.params;

  if (!slug) throw new ApiError(BAD_REQUEST, "no slug provided to delete");

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if user exist
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  // check if blog exist
  const blog = await Blog.findOne({ slug });
  if (!blog) throw new ApiError(NOT_FOUND, "blog not found");

  // check if user has already liked it
  const alreadyLiked = blog.likedBy.some((id) => id.toString() === user._id.toString()) ?? false;
  if (alreadyLiked) {
    // remove user to the likedBy array of blogs
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        $pull: {
          likedBy: user._id,
        },
      },
      {
        returnDocument: "after",
      },
    );

    // remove blog from users liked by array
    await User.findByIdAndUpdate(user._id, {
      $pull: {
        likedBlogs: blog._id,
      },
    });

    return res.status(OK).json({ message: "removed liked from blog", success: true, blog: updatedBlog });
  }

  // add user to the likedBy array of blogs
  const updatedBlog = await Blog.findOneAndUpdate(
    { slug },
    {
      $addToSet: {
        likedBy: user._id,
      },
    },
    {
      returnDocument: "after",
    },
  );

  await User.findByIdAndUpdate(user._id, {
    $addToSet: {
      likedBlogs: blog._id,
    },
  });

  res.status(OK).json({ message: "added like to blog", success: "true", blog: updatedBlog });
});

export const setBlogOfMonth = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user || !req.user.userID) {
    throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");
  }

  const { slug } = req.params;
  if (!slug) throw new ApiError(BAD_REQUEST, "no slug provided to delete");

  const { userID } = req.user;
  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);
  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = user.role === "ADMIN";
  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const updatedBlog = await Blog.findOneAndUpdate(
    { slug },
    [
      {
        $set: {
          blogOfMonth: { $not: "$blogOfMonth" },
        },
      },
    ],
    { returnDocument: "after" },
  );

  res.status(OK).json({ message: `${updatedBlog?.blogOfMonth ? "added to" : "removed from"} blog of the month` });
});
