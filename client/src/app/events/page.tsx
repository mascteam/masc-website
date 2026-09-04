"use client";
import { toasty } from "@/components/ToastProvider";

import axiosInstance from "@/services/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EventType } from '@/app/events/create/page';
import { useRouter } from "next/navigation";
import LoadingPage from "../loading";

const EventsPage = () => {
  const [eventData, setEventData] = useState<EventType[]>([]);

  const router = useRouter();

  const fetchEvents = async () => {
    try {
      const { data } = await axiosInstance.get("/events");
      setEventData(data.events);
    } catch (error: any) {
      toasty(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  if(!eventData || eventData.length <1){
    return <LoadingPage/>
  }

  return (
    <section className=" min-h-screen mt-20">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-12">
        {eventData && eventData.map((event, i) => (
          <div key={i} className="aspect-[3/4] border border-white/10 flex items-center justify-center flex-col">
            <Link className="h-full w-full" href={`/events/${event.slug}`}>
              <img src={event.banner} alt={`${event.title}`} className="h-full w-full object-cover cursor-target" />
            </Link>
            <button
              onClick={() => router.push(`/events/${event.slug}`)}
              className="text-center w-full rounded-none bg-black text-white pb-2 cursor-target"
            >
              Check Out
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsPage;
