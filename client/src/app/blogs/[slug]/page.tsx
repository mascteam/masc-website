"use client";

import NotFound from "@/app/not-found";
import axiosInstance from "@/services/axios";

import { BlogReadOnly } from "@/components/blogs/BlogReadOnly";
import AdminBlogOptions from "@/components/blogs/AdminBlogOptions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toasty } from "@/components/ToastProvider";
import { useLoadingStore } from "@/store/loading";
import LoadingPage from "@/app/loading";
import { useUserStore } from "@/store/user";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  likes: number;
  likedBy: string[];
  blogOfMonth: boolean;
  content: string;
  bannerUrl: string;
  description: string;
  writtenBy: string;
  createdAt: string;
  updatedAt: string;
};

const BlogPage = () => {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  const { loading, setLoading } = useLoadingStore();

  const { user } = useUserStore();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/blogs/${params.slug}`);

        setBlog(data.blog);
      } catch (error: any) {
        toasty(error.response.data.message || "Failed to Fetch Blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, []);

  const likeBlog = async () => {
    try {
      const { data } = await axiosInstance.post(`/blogs/${blog?.slug}/like`, {}, { withCredentials: true });
      setBlog(data.blog);
      toasty(data.message);
    } catch (error) {
      toasty("failed to like blog");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!blog) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        <div className="mb-4 flex text-sm items-center justify-between w-full gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-500">
          <h3>
            <span>MASC</span>
            <span>/</span>
            <span>Blog</span>
          </h3>

          <span onClick={likeBlog} className="flex justify-center items-center gap-x-1 cursor-target">
            {blog.likedBy.some((id) => id.toString() === user?._id) ? (
              <FaStar size={28} fill="gold" />
            ) : (
              <CiStar size={30} />
            )}
            <span className="w-8 shrink-0 text-xl text-gray-400">{blog.likes || 0}</span>
          </span>
        </div>

        <h1 className="max-w-6xl text-lg md:text-5xl font-medium leading-[1.2] tracking-tight">{blog.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>
            {new Date(blog.createdAt!).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>

          <span className="h-1 w-1 rounded-full bg-black" />

          <span>{blog.writtenBy}</span>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl p-6 text-xs md:text-lg">
        <BlogReadOnly value={blog.content} />
      </section>

      {/* Footer metadata */}
      <section className="mx-auto w-full max-w-6xl border-t-2 border-black px-6 py-8 md:px-10">
        <div className="hidden md:flex flex-row gap-3 justify-between text-xs md:text-[10px] uppercase tracking-[0.25em] text-slate-500">
          <span>MASC / BLOG</span>
          <span>{blog.slug}</span>
        </div>
        <AdminBlogOptions slug={params.slug as string} />
      </section>
    </main>
  );
};

export default BlogPage;
