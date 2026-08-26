import NotFound from "@/app/not-found";
import UpdateEventDetails from "@/components/events/UpdateEventDetails";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";
import React from "react";

const UpdateEventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    const { data }: { data: { event: EventType } } = await axiosInstance.get(`/events/${slug}`);

    return (
      <section className=" min-h-[70vh] flex justify-center items-center">
        <UpdateEventDetails event={data.event} />
      </section>
    );
  } catch (error: any) {
    return <NotFound />;
  }
};

export default UpdateEventPage;
