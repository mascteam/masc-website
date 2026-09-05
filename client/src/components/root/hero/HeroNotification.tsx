"use client";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroNotification = () => {
  const [event, setEvent] = useState<EventType | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const { data } = await axiosInstance.get("/events/latest", { withCredentials: true });
      setEvent(data.events);
    };

    fetchUpcomingEvent();
  }, []);

  return (
    event && (
      <div onClick={()=> router.push(`/events/${event.slug}`)} className="hidden cursor-target cursor-pointer md:flex flex-row justify-around items-center border-2 border-black rounded-sm w-[20%] h-1/2 p-x">
        <img src={event.banner} className="h-full w-[35%] object-contain p-1" />
        <div className="flex flex-col justify-between items-start">
          <h3 className="flex flex-row gap-1 justify-start items-center">
            <div className="size-2 bg-red-400" />
            <span className="text-xs p-2">Upcoming Event</span>
          </h3>
          <h2 className="cursor-target text-wrap uppercase">{event.title.slice(0, 10) + "..."}</h2>
          <span className="text-xs mt-2">{new Date(event.createdAt!).toDateString()}</span>
        </div>
      </div>
    )
  );
};

export default HeroNotification;
