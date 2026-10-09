"use client";

import LoadingPage from "@/app/loading";
import axiosInstance from "@/services/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LatestEventPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const { data } = await axiosInstance.get("/events/latest");
        router.push(`/events/${data.event.slug}`);
      } catch (error) {
        router.push("/events/404");
      }
    };

    fetchLatestEvent();
  }, []);
  return <LoadingPage />;
};

export default LatestEventPage;
