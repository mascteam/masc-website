"use server";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";

const HeroToast = async () => {
  try {
    const {
      data: { events },
    }: { data: { events: EventType } } = await axiosInstance.get("/events/latest", { withCredentials: true });

    return (
      <div className="hidden cursor-target cursor-pointer md:flex flex-row justify-around items-center border-2 border-black rounded-sm w-[30%] h-1/2 p-x">
        <img src={events.banner} className="h-full w-[35%] object-cover p-1" />
        <div className="flex flex-col justify-around items-start">
          <h3 className="flex flex-row gap-1 justify-start items-center">
            <div className="size-2 bg-red-400" />
            <span className="text-xs p-2">Upcoming Event</span>
          </h3>
          <h2 className="cursor-target">{events.title}</h2>
          <span className="text-xs">{new Date(events.createdAt!).toDateString()}</span>
        </div>
      </div>
    );
  } catch (error) {
    return null;
  }
};

export default HeroToast;
