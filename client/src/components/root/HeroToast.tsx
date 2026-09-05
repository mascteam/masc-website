"use client";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";
import { useEffect, useState } from "react";

const HeroToast = () => {
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const { data } = await axiosInstance.get("/events/latest", { withCredentials: true });
      setEvent(data.event);
    };

    fetchUpcomingEvent();
  }, []);

  return (
    event && (
      <div className="hidden cursor-target cursor-pointer md:flex flex-row justify-around items-center border-2 border-black rounded-sm w-[30%] h-1/2 p-x">
        <img src={event.banner} className="h-full w-[35%] object-cover p-1" />
        <div className="flex flex-col justify-around items-start">
          <h3 className="flex flex-row gap-1 justify-start items-center">
            <div className="size-2 bg-red-400" />
            <span className="text-xs p-2">Upcoming Event</span>
          </h3>
          <h2 className="cursor-target">{event.title}</h2>
          <span className="text-xs">{new Date(event.createdAt!).toDateString()}</span>
        </div>
      </div>
    )
  );
};

export default HeroToast;
