import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Explore MASC blogs covering mathematics, science, technology, programming, research, ideas, and curious questions.",
  alternates: {
    canonical: "/blogs",
  },
};

const BlogsLayout = ({children}: {children : ReactNode}) => {
  return children
}

export default BlogsLayout