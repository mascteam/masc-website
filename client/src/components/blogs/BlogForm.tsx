"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BlogEditor } from "./BlogEditor";
import { BlogReadOnly } from "./BlogReadOnly";
import axiosInstance from "@/services/axios";
import { toasty } from "../ToastProvider";
import { useUserStore } from "@/store/user";
import NotFound from "@/app/not-found";

export type BlogData = {
  title: string;
  bannerUrl: string;
  content: string;
  slug: string;
  createdAt?: string;
};

type BlogFormProps = {
  mode: "create" | "update";
  initialData?: BlogData;
  blogId?: string;
};

export default function BlogForm({ mode, initialData, blogId }: BlogFormProps) {
  const router = useRouter();
  const { user } = useUserStore();

  const [blogContent, setBlogContent] = useState<BlogData>({
    title: initialData?.title ?? "",
    bannerUrl: initialData?.bannerUrl ?? "",
    content: initialData?.content ?? "",
    slug: initialData?.slug ?? "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.bannerUrl ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const updateField = <K extends keyof BlogData>(field: K, value: BlogData[K]) => {
    setBlogContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    updateField("bannerUrl", "");

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axiosInstance.post("/image-to-url", formData, { withCredentials: true });

      console.log(data);

      updateField("bannerUrl", data.url);

      await navigator.clipboard.writeText(data.url);

      toasty("Uploaded & copied to clipboard");
    } catch (error: any) {
      toasty(error.response?.data?.message ?? "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      toasty("Select an image first");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axiosInstance.post("/image-to-url", formData, { withCredentials: true });

      updateField("bannerUrl", data.url);

      await navigator.clipboard.writeText(data.url);

      toasty("Uploaded & copied to clipboard");
    } catch (error: any) {
      toasty(error.response?.data?.message ?? "Upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!blogContent.bannerUrl) {
      toasty("Upload a banner image first");
      return;
    }

    try {
      setLoading(true);

      const response =
        mode === "create"
          ? await axiosInstance.post("/blogs", blogContent, {
              withCredentials: true,
            })
          : await axiosInstance.patch(`/blogs/${blogId}`, blogContent, { withCredentials: true });

      router.push(`/blogs/${response.data.blog.slug}`);
    } catch (error: any) {
      toasty(error.response.data.message);
      if (error.response.data.errors.length > 0) {
        return error.response.data.errors.map((err: { path: string; message: string }) =>
          toasty(`${err.path}, ${err.message}`),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRichTextImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axiosInstance.post("/image-to-url", formData, {
        withCredentials: true,
      });

      return data.url;
    } catch (error: any) {
      toasty(error.response?.data?.message ?? "Image upload failed");

      throw error;
    }
  };

  if (user?.role === "USER") {
    return <NotFound />;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl space-y-8">
      <header className="flex items-end justify-between gap-6 border-b-2 border-black pb-6">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em]">MASC / BLOG</p>

          <p className="text-sm">{mode === "create" ? "Share something worth knowing." : "Update your article."}</p>
        </div>
      </header>

      <section className="space-y-5">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest">Title</label>

          <input
            value={blogContent.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Enter your blog title..."
            className="w-full border-b-2 border-black py-1 text-2xl outline-none"
          />
        </div>

        <div className="space-y-4 border-b-2 border-black pb-5">
          <label className="block text-xs uppercase tracking-widest">Banner Image</label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full flex-1 cursor-pointer text-sm"
            />
          </div>

          {preview && (
            <div className="overflow-hidden border border-black">
              <img src={preview} alt="Banner preview" className="h-64 w-full object-cover" />
            </div>
          )}

          {blogContent.bannerUrl && (
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest">Banner URL</p>

              <input
                value={blogContent.bannerUrl}
                onChange={(event) => updateField("bannerUrl", event.target.value)}
                className="w-full rounded-lg text-sm outline-none"
              />
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs uppercase tracking-widest">Content</label>

          <span className="text-[10px] uppercase tracking-widest text-slate-700">Rich Text</span>
        </div>

        <div className="relative border border-black p-2">
          {mode === "create" || "update" ? (
            <BlogEditor
              value={blogContent.content}
              onChange={(value) => updateField("content", value)}
              onImageUpload={handleRichTextImageUpload}
            />
          ) : (
            <BlogReadOnly value={blogContent.content} />
          )}
        </div>
      </section>

      <div className="flex items-center justify-between border-t-2 border-black pt-6 text-black">
        <button type="button" onClick={() => router.back()} className="cursor-target text-sm">
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !blogContent.bannerUrl}
          className="cursor-target border-y-2 border-black p-2 text-sm transition disabled:opacity-40"
        >
          {loading ? "Saving..." : mode === "create" ? "Publish Blog" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
