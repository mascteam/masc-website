"use client";

import NotFound from "@/app/not-found";
import BlogForm, { BlogData } from "@/components/blogs/BlogForm";
import axiosInstance from "@/services/axios";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateBlogPage = () => {
  const [blog, setBlog] = useState<BlogData | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const { data } = await axiosInstance.get(`/blogs/${slug}`);
        setBlog(data.blog);
      } catch (error: any) {
        console.error(error.message || error);
        setBlog(null);
      }
    };

    getBlogData();
  }, []);

  if (!blog) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen px-6 py-16 text-black">
      <BlogForm mode="create" initialData={blog} />
    </main>
  );
};

export default UpdateBlogPage;
