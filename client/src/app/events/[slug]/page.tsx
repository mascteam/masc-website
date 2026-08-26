import LoadingPage from "@/app/loading";
import NotFound from "@/app/not-found";
import EventsDetails from "@/components/events/EventsDetails";

import axiosInstance from "@/services/axios";
import { EventType } from "@/app/events/create/page";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const { slug } = await params;

    const { data }: { data: { event: EventType } } = await axiosInstance.get(`/events/${slug}`);

    return (
      <section className=" min-h-[70vh] flex justify-center items-center">
        <EventsDetails event={data.event} />
      </section>
    );
  } catch (error: any) {
    return <NotFound />;
  }
};

export default EventDetailsPage;
