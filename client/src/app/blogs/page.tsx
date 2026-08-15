"use client";

import BlogPreview, { BlogContentType } from "@/components/blogs/BlogPreview";

const BlogPage = () => {
  const dummyBlogs: BlogContentType[] = [
    {
      title: "The Future of Artificial Intelligence",
      createdAt: "2026-08-13",
      description:
        "Technology  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there is always something new to discover. Through thoughtful discussions and practical examples, we aim to encourage curiosity, creativity, and a deeper appreciation for the world of technology and science.",
      bannerUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    },
    {
      title: "Why Mathematics Matters",
      createdAt: "2026-08-10",
      description:
        "Mathematics helps us understand patterns, solve complex problems, and make sense of the world around us.",
      bannerUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    },
    {
      title: "Exploring the Wonders of Space",
      createdAt: "2026-08-05",
      description:
        "Technology  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there  continues to shape the way we understand and interact with the world around us. From artificial intelligence and scientific discoveries to new ways of communicating and solving everyday problems, innovation is constantly changing our lives. In this blog, we explore ideas, trends, and developments that are influencing the future while making complex topics easier to understand. Whether you are a student, developer, researcher, or simply someone curious about how things work, there is always something new to discover. Through thoughtful discussions and practical examples, we aim to encourage curiosity, creativity, and a deeper appreciation for the world of technology and science.",
      bannerUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    },
  ];

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center md:px-10 mt-10">
      {dummyBlogs.map((blog) => (
        <BlogPreview blogContent={blog} />
      ))}
    </main>
  );
};

export default BlogPage;
