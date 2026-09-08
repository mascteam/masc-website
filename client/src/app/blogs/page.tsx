"use client";

import BlogPreview from "@/components/blogs/BlogPreview";
import LoadingPage from "../loading";
import axiosInstance from "@/services/axios";
import { Blog } from "./[slug]/page";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loading";
import NotFound from "../not-found";
import { toasty } from "@/components/ToastProvider";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const {
          data: { blogs },
        }: { data: { blogs: Blog[] } } = await axiosInstance.get("/blogs");

        setBlogs(blogs);
      } catch (error: any) {
        toasty(error.resonse.data.message);
        return <NotFound />;
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center md:px-10 mt-10">
      {blogs.map((blog) => (
        <BlogPreview key={blog.slug} blogContent={blog} />
      ))}
    </main>
  );
};

export default BlogPage;
