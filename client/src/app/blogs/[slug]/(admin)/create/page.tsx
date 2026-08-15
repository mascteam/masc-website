"use client"

import BlogForm from "@/components/blogs/BlogForm";

export default function CreateBlogPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-black">
      <BlogForm mode="create" />
    </main>
  );
}