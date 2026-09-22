"use client";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";
import { useCoverStore } from "@/store/cover";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroNotification = () => {
  const [event, setEvent] = useState<EventType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const { data } = await axiosInstance.get("/events/latest", { withCredentials: true });
      setEvent(data.event);
    };

    fetchUpcomingEvent();
  }, []);

  const { hovered } = useCoverStore();

  return (
    event && (
      <div
        onClick={() => router.push(`/events/${event.slug}`)}
        className="cursor-target hidden md:flex flex-row justify-start items-center border-2 border-black w-[25%] h-[55%] gap-x-1"
      >
        <div className="h-full w-[45%] flex justify-center items-center">
          <img src={event.banner} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-between items-start">
          <h3 style={{ color: hovered ? "gray" : "black" }} className="flex flex-row gap-1 justify-start items-center">
            <div className="size-2 bg-red-400" />
            <span className="text-xs p-2">Upcoming Event</span>
          </h3>
          <h2 style={{ color: hovered ? "white" : "black" }} className="cursor-target text-sm text-wrap uppercase">
            {event.title.slice(0, 30) + "..."}
          </h2>
          <span style={{ color: hovered ? "gray" : "black" }} className="text-xs mt-2">
            {event.date}
          </span>
        </div>
      </div>
    )
  );
};

export default HeroNotification;
