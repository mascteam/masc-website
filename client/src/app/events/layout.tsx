import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming and past MASC events, workshops, competitions, talks, and activities in mathematics, science, and technology.",
  alternates: {
    canonical: "/events",
  },
};

const EventsLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default EventsLayout;
