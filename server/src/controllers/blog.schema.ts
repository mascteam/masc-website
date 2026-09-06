import z from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  bannerUrl: z.string().url(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  bannerUrl: z.string().url().optional(),
});