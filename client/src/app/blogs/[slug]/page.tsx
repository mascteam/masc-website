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

export type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  bannerUrl: string;
  createdAt: string;
  updatedAt: string;
};

const BlogPage = () => {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  const { loading, setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      try {
        const { data } = await axiosInstance.get(`/blogs/${params.slug}`);

        setBlog(data.blog);
      } catch (error: any) {
        toasty(error.response.data.message || "Failed to Fetch Blog");
        setBlog(null);
      } finally {
        setLoading(false)
      }
    };

    fetchBlog();
  }, []);

  if(loading){
    return <LoadingPage/>
  }

  if (!blog) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        <div className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-slate-500">
          <span>MASC</span>
          <span>/</span>
          <span>Blog</span>
        </div>

        <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-tight">{blog.title}</h1>

        <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span>
            {new Date(blog.createdAt!).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>

          <span className="h-1 w-1 rounded-full bg-black" />

          <span>Article</span>
        </div>
      </section>

      {/* Banner */}
      <section className="mx-auto mt-14 w-full max-w-6xl px-6 md:px-10">
        <div className="overflow-hidden border border-black">
          <img src={blog.bannerUrl} alt={blog.title} className="aspect-[16/8] w-full object-cover" />
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <BlogReadOnly value={blog.content} />
      </section>

      {/* Footer metadata */}
      <section className="mx-auto w-full max-w-6xl border-t-2 border-black px-6 py-8 md:px-10">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-slate-500">
          <span>MASC / BLOG</span>
          <span>{blog.slug}</span>
        </div>
        <AdminBlogOptions slug={params.slug as string} />
      </section>
    </main>
  );
};

export default BlogPage;
