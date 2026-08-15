"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

import axiosInstance from "@/services/axios";
import { AxiosError } from "axios";
import { toasty } from "../ToastProvider";

type BlogData = {
  title: string;
  bannerUrl: string;
  content: string;
};

type BlogFormProps = {
  mode: "create" | "update";
  initialData?: BlogData;
  blogId?: string;
};

export default function BlogForm({ mode, initialData, blogId }: BlogFormProps) {
  const router = useRouter();

  const [blogContent, setBlogContent] = useState<BlogData>({
    title: initialData?.title ?? "",
    bannerUrl: initialData?.bannerUrl ?? "",
    content: initialData?.content ?? "",
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof BlogData, value: string) => {
    setBlogContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } =
        mode === "create"
          ? await axiosInstance.post("/api/blogs", blogContent, { withCredentials: true })
          : await axiosInstance.put(`/api/blogs/${blogId}`, blogContent, { withCredentials: true });

      router.push(`/blogs/${data.blog.slug}`);
    } catch (error : any) {
      toasty(error.response.data.message || `failed to ${mode} blog`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 mt-10">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 border-b-2 border-black pb-6">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] ">MASC / BLOG</p>

          <p className="mt-2 text-sm ">
            {mode === "create" ? "Share something worth knowing." : "Update your article."}
          </p>
        </div>
      </div>

      {/* Basic inblogContentation */}
      <section className="space-y-5">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest ">Title</label>

          <input
            value={blogContent.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter your blog title..."
            className="w-full border-b-2 border-black py-1 text-2xl outline-none"
          />
        </div>

        <div className="border-b-2 border-black">
          <label className="mb-2 text-xs uppercase tracking-widest ">Banner URL</label>

          <input
            value={blogContent.bannerUrl}
            onChange={(e) => updateField("bannerUrl", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg text-sm  outline-none"
          />
        </div>
      </section>

      {/* Editor */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs uppercase tracking-widest ">Content</label>

          <span className="text-[10px] uppercase tracking-widest text-slate-700">Rich Text</span>
        </div>

        <div className="border border-black p-2 h-[500px]">
          <SimpleEditor content={blogContent.content} onChange={(value) => updateField("content", value)} />
        </div>
      </section>

      {/* Bottom actions */}
      <div className="flex items-center justify-between border-t-2 border-black text-black pt-6">
        <button type="button" onClick={() => router.back()} className="cursor-target text-sm">
          Cancel
        </button>

        <button
          onChange={handleSubmit}
          disabled={loading}
          className="cursor-target border-y-2 border-black p-2 text-sm transition"
        >
          {loading ? "Saving..." : mode === "create" ? "Publish Blog" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
