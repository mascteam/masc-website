import z from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  bannerUrl: z.string().url(),
});

export const updateBlogSchema = createBlogSchema.partial();