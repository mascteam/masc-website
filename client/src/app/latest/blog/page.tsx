"use client";

import LoadingPage from "@/app/loading";
import axiosInstance from "@/services/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LatestBlog = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const { data } = await axiosInstance.get("/blogs/latest");
        router.push(`/blogs/${data.blog.slug}`);
      } catch (error) {
        router.push("/blogs/404");
      }
    };

    fetchLatestEvent();
  }, []);
  return <LoadingPage />;
};

export default LatestBlog;
