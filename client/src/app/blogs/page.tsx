"use server";

import BlogPreview from "@/components/blogs/BlogPreview";
import LoadingPage from "../loading";
import axiosInstance from "@/services/axios";
import { Blog } from "./[slug]/page";

const BlogPage = async () => {
  try {
    const {
      data: { blogs },
    }: { data: { blogs: Blog[] } } = await axiosInstance.get("/blogs");

    if (!blogs || blogs.length < 1) throw new Error("failed to fetch blogs");

    return (
      <main className="min-h-[80vh] flex flex-col justify-center items-center md:px-10 mt-10">
        {blogs.map((blog) => (
          <BlogPreview key={blog.slug} blogContent={blog} />
        ))}
      </main>
    );
  } catch (error : any) {
    console.error(error.message || error)
    return <LoadingPage />;
  }
};

export default BlogPage;
