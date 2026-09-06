import axiosInstance from "@/services/axios";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Blog } from "./page";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data } = await axiosInstance.get(`/blogs/${slug}`);

    const blog: Blog = data.blog;

    if (!blog) {
      return {
        title: "Blog Not Found",
        description:
          "Explore MASC blogs covering mathematics, science, technology, programming, research, ideas, and curious questions.",
      };
    }

    return {
      title: blog.title,
      description: blog.content.slice(0, 160),

      alternates: {
        canonical: `/blogs/${blog.slug}`,
      },

      openGraph: {
        type: "article",
        title: blog.title,
        description: blog.content.slice(0, 160),
        url: `/blogs/${blog.slug}`,
        images: blog.bannerUrl
          ? [
              {
                url: blog.bannerUrl,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ]
          : undefined,

        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: ["MASC"],
      },
    };
  } catch {
    return {
      title: "Blog | MASC",
      description: "Read articles and blogs from MASC.",
    };
  }
}

const DynamicBlogLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default DynamicBlogLayout;
