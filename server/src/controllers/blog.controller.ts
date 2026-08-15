import type { Request, Response } from "express";
import { Blog } from "../models/blog.model";
import { createBlogSchema, updateBlogSchema } from "./blog.schema";
import ApiError from "../utils/apiError";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { Organization } from "../models/organization.model";
import { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } from "../constants/status-codes";
import { User } from "../models/user.model";
import asyncHandler from "../utils/asyncHandler";

export const getAllBlogs = asyncHandler(async (_: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json({
    blogs,
  });
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) throw new ApiError(BAD_REQUEST,"slug was not provided in request");
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

  // check if such organization exist or not
  const organization = await Organization.findOne({
    slug: "masc",
  });

  if (!organization) {
    throw new ApiError(NOT_FOUND, "invalid slug provided, to find organization");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = organization.members.includes(user._id) || user.role === "ADMIN";

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const blog = await Blog.create(validated);

  res.status(201).json({
    blog,
  });
});

export const updateBlogBySlug = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const validated = updateBlogSchema.parse(req.body);

  const { slug } = req.params;
    if(!slug) throw new ApiError(BAD_REQUEST,"no slug provided to update");

  if (!req.user || !req.user.userID) throw new ApiError(UNAUTHORIZED, "unauthorized to perform this action");

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if such organization exist or not
  const organization = await Organization.findOne({
    slug: "masc",
  });

  if (!organization) {
    throw new ApiError(NOT_FOUND, "invalid slug provided, to find organization");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = organization.members.includes(user._id) || user.role === "ADMIN";

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const blog = await Blog.findOneAndUpdate({ slug }, validated, {
    new: true,
  });

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

  const {slug} = req.params;

  if(!slug) throw new ApiError(BAD_REQUEST,"no slug provided to delete");

  const { userID } = req.user;

  if (!userID) {
    throw new ApiError(UNAUTHORIZED, "Bad request, userID is missing");
  }

  // check if such organization exist or not
  const organizationToUpdate = await Organization.findOne({
    slug: "masc",
  });

  if (!organizationToUpdate) {
    throw new ApiError(NOT_FOUND, "invalid slug provided, to find organization");
  }

  // check if authenticated user is in the organization
  const user = await User.findById(userID);

  if (!user) {
    throw new ApiError(NOT_FOUND, "invalid token provided, failed to fetch user");
  }

  const userAuthorised = organizationToUpdate.members.includes(user._id) || user.role === "ADMIN";

  if (!userAuthorised) {
    throw new ApiError(UNAUTHORIZED, "access denied, you arent authorised to perform this action");
  }

  const blog = await Blog.findOneAndDelete({slug});

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.status(200).json({
    message: "Blog deleted",
  });
});
