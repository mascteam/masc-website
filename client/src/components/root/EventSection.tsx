"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";
import { toasty } from "../ToastProvider";

const EventSection = () => {
  const eventData: { banner: string; title: string; slug: string }[] = [
    { banner: "event 1", title: "banner 1", slug: "bannner 1" },
    { banner: "event 2", title: "banner 2", slug: "bannner 2" },
    { banner: "event 3", title: "banner 3", slug: "bannner 3" },
    { banner: "event 4", title: "banner 4", slug: "bannner 4" },
    { banner: "event 5", title: "banner 5", slug: "bannner 5" },
  ];

  const router = useRouter();

  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data }: { data: { events: EventType[] } } = await axiosInstance.get(`/events`);
        setEvents(data.events);
      } catch {
        (err: any) => toasty(err.message || "failed to fetch events");
      }
    };

    getEvents();
  }, []);

  return (
    <section className="h-screen md:h-[80vh] w-screen flex flex-col justify-start items-start px-5">
      <h1 className="text-4xl mt-5">Upcoming Events</h1>
      <p className="hidden md:flex text-gray-600">
        Workshops, competitions, talks, and more. See what's happening at MASC and find something worth being part of.
      </p>
      <section className=" h-full w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 lg:grid-cols-4 xl:grid-cols-5 pt-6">
          {events &&
            events.map((event, i) => (
              <div
                key={i}
                className={`aspect-[3/4] overflow-y-scroll border border-black h-full w-full items-center justify-center flex flex-col ${i == 4 ? "md:hidden" : ""} `}
              >
                <Link className="h-full w-full" href={`/events/${event.slug}`}>
                  <img
                    src={event.banner}
                    alt={`${event.title}`}
                    className="cursor-target cursor-none h-full w-full object-cover"
                  />
                </Link>
               
              </div>
            ))}
          <div className="mt-10 cursor-target aspect-square overflow-y-scroll border rounded-full bg-black text-white border-black  w-full flex items-center justify-center flex-col">
            <Link className="h-full w-full flex flex-col gap-3 justify-center items-center" href={`/events`}>
              <span>Want More</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default EventSection;
