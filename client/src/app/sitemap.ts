import axiosInstance from "@/services/axios";
import type { MetadataRoute } from "next";
import { Blog } from "./blogs/[slug]/page";
import { EventType } from "./events/create/page";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, events]: [Blog[], EventType[]] = await Promise.all([
    axiosInstance.get("/blogs").then((res) => res.data.blogs),
    axiosInstance.get("/events").then((res) => res.data.events),
  ]);

  const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));

  const eventUrls: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${BASE_URL}/events/${event.slug}`,
    lastModified: event.updatedAt,
  }));

  return [

    // STATIC PAGES
    {
      url: BASE_URL,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
    },

    // DYNAMIC PAGES
    ...blogUrls,
    ...eventUrls,
  ];
}
