import axiosInstance from "@/services/axios";
import React, { ReactNode } from "react";
import { EventType } from "../create/page";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data } = await axiosInstance.get(`/events/${slug}`);

    const event: EventType = data.event;

    if (!event) {
      return {
        title: "Event Not Found",
        description: "Events organized by MASC.",
      };
    }

    return {
      title: event.title,
      description: event.description,

      alternates: {
        canonical: `/events/${event.slug}`,
      },

      openGraph: {
        type: "website",
        title: event.title,
        description: event.description,
        url: `/events/${event.slug}`,
        images: event.banner
          ? [
              {
                url: event.banner,
                width: 1200,
                height: 630,
                alt: event.title,
              },
            ]
          : undefined,
      },
    };
  } catch {
    return {
      title: "Events | MASC",
      description: "Events organized by MASC.",
    };
  }
}

const DynamicEventsLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default DynamicEventsLayout;
