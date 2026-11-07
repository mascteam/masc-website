import { Router } from "express";
import {
  createBlog,
  deleteBlogBySlug,
  getAllBlogOfMonth,
  getAllBlogs,
  getBlogBySlug,
  getLatestBlog,
  likedBlogBySlug,
  setBlogOfMonth,
  updateBlogBySlug,
} from "../controllers/blog.controller";

import { checkAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllBlogs);
router.get("/blogs-of-month", getAllBlogOfMonth);
router.get("/latest", getLatestBlog);

router.get("/:slug", getBlogBySlug);

router.post("/", checkAuth, createBlog);
router.patch("/:slug", checkAuth, updateBlogBySlug);
router.delete("/:slug", checkAuth, deleteBlogBySlug);

router.post("/:slug/like", checkAuth, likedBlogBySlug);
router.post("/:slug/blog-of-month", checkAuth, setBlogOfMonth);

export default router;
