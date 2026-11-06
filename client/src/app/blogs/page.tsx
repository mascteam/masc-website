"use client";

import BlogPreview from "@/components/blogs/BlogPreview";
import LoadingPage from "../loading";
import axiosInstance from "@/services/axios";
import { Blog } from "./[slug]/page";
import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loading";
import NotFound from "../not-found";
import { toasty } from "@/components/ToastProvider";

import { FaCrown, FaArrowRight } from "react-icons/fa6";
import { LuSparkles } from "react-icons/lu";
import { CgCrown } from "react-icons/cg";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsOfMonth, setBlogsOfMonth] = useState<Blog[]>([]);

  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/blogs");

        setBlogs(data.blogs);
        setBlogsOfMonth(data.blogOfTheMonth);
      } catch (error: any) {
        toasty(error.resonse.data.message);
        return <NotFound />;
      } finally {
        setLoading(false);
      }
    };
    const fetchBlogsOfMonth = async () => {
      setLoading(true);
      try {
        const {
          data: { blogs },
        }: { data: { blogs: Blog[] } } = await axiosInstance.get("/blogs");

        setBlogsOfMonth(blogs);
      } catch (error: any) {
        toasty(error.resonse.data.message);
        return <NotFound />;
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
    fetchBlogsOfMonth();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center md:px-10 mt-10">
      <section className="w-full flex flex-col justify-center items-center mt-10 border-y border-amber-400 bg-amber-100/20">
        {/* Top accent */}
        <div className="flex items-center justify-between border-b border-[#B58B45]/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="font-[Michroma] text-2xl tracking-[0.2em] text-[#B58B45]">BLOG OF THE MONTH</span>
          </div>
        </div>
        {blogsOfMonth.map((blog) => (
          <BlogPreview key={blog._id} blogContent={blog} />
        ))}
      </section>

      {blogs.map((blog) => (
        <BlogPreview key={blog._id} blogContent={blog} />
      ))}
    </main>
  );
};

export default BlogPage;
