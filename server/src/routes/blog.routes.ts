import { Router } from "express";
import {
  createBlog,
  deleteBlogBySlug,
  getAllBlogs,
  getBlogBySlug,
  getLatestBlog,
  updateBlogBySlug,
} from "../controllers/blog.controller";

import { checkAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

router.get("/latest", getLatestBlog);

router.post("/", checkAuth, createBlog);
router.patch("/:slug", checkAuth, updateBlogBySlug);
router.delete("/:slug", checkAuth, deleteBlogBySlug);

export default router;
