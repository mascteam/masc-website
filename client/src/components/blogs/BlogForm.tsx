"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";

import axiosInstance from "@/services/axios";
import { toasty } from "../ToastProvider";
import NotFound from "@/app/not-found";
import { useUserStore } from "@/store/user";

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

export default function BlogForm({
  mode,
  initialData,
  blogId,
}: BlogFormProps) {
  const router = useRouter();
  const { user } = useUserStore();

  const [blogContent, setBlogContent] = useState<BlogData>({
    title: initialData?.title ?? "",
    bannerUrl: initialData?.bannerUrl ?? "",
    content: initialData?.content ?? "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.bannerUrl ?? "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof BlogData, value: string) => {
    setBlogContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    // Clear old URL until the new image is uploaded
    updateField("bannerUrl", "");
  };

  const handleUpload = async () => {
    if (!image) {
      return toasty("Select an image first");
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axiosInstance.post(
        "/image-to-url",
        formData,
        {withCredentials : true}
      );

      updateField("bannerUrl", data.url);

      await navigator.clipboard.writeText(data.url);

      toasty("Uploaded & copied to clipboard");
    } catch (error: any) {
      toasty(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!blogContent.bannerUrl) {
      return toasty("Upload a banner image first");
    }

    try {
      setLoading(true);

      const { data } =
        mode === "create"
          ? await axiosInstance.post(
              "/blogs",
              blogContent,
              { withCredentials: true }
            )
          : await axiosInstance.put(
              `/blogs/${blogId}`,
              blogContent,
              { withCredentials: true }
            );

      router.push(`/blogs/${data.blog.slug}`);
    } catch (error: any) {
      toasty(
        error.response?.data?.message ||
          `Failed to ${mode} blog`
      );
    } finally {
      setLoading(false);
    }
  };

  if (user && user.role === "USER") {
    return <NotFound />;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 border-b-2 border-black pb-6">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em]">
            MASC / BLOG
          </p>

          <p className="mt-2 text-sm">
            {mode === "create"
              ? "Share something worth knowing."
              : "Update your article."}
          </p>
        </div>
      </div>

      {/* Basic information */}
      <section className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest">
            Title
          </label>

          <input
            value={blogContent.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
            placeholder="Enter your blog title..."
            className="w-full border-b-2 border-black py-1 text-2xl outline-none"
          />
        </div>

        {/* Banner */}
        <div className="space-y-4 border-b-2 border-black pb-5">
          <label className="block text-xs uppercase tracking-widest">
            Banner Image
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full cursor-pointer text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={!image || uploadingImage}
              className="border-y-2 cursor-target border-black px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              {uploadingImage
                ? "Uploading..."
                : "Upload Image"}
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div className="overflow-hidden border border-black">
              <img
                src={preview}
                alt="Banner preview"
                className="h-64 w-full object-cover"
              />
            </div>
          )}

          {/* Uploaded URL */}
          {blogContent.bannerUrl && (
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-widest">
                Banner URL
              </p>

              <input
                value={blogContent.bannerUrl}
                onChange={(e) =>
                  updateField(
                    "bannerUrl",
                    e.target.value
                  )
                }
                className="w-full rounded-lg text-sm outline-none"
              />
            </div>
          )}
        </div>
      </section>

      {/* Editor */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs uppercase tracking-widest">
            Content
          </label>

          <span className="text-[10px] uppercase tracking-widest text-slate-700">
            Rich Text
          </span>
        </div>

        <div className=" overflow-hidden border border-black p-2">
          <SimpleEditor
            content={blogContent.content}
            onChange={(value) =>
              updateField("content", value)
            }
          />
        </div>
      </section>

      {/* Bottom actions */}
      <div className="flex items-center justify-between border-t-2 border-black pt-6 text-black">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-target text-sm"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !blogContent.bannerUrl}
          className="cursor-target border-y-2 border-black p-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Publish Blog"
              : "Save Changes"}
        </button>
      </div>
    </div>
  );
}