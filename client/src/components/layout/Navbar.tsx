"use client";

import { usePathname } from "next/navigation";

const navs: {
  name: string;
  path: string;
}[] = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Blogs", path: "/blogs" },
  { name: "Register", path: "/register" },
];

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/user";
import { EventType } from "@/app/events/create/page";
import axiosInstance from "@/services/axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { isAuth } = useUserStore();

  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      const { data } = await axiosInstance.get("/events/latest", { withCredentials: true });
      setEvent(data.event);
    };

    fetchUpcomingEvent();
  }, []);

  const handleNav = async (nav: string) => {
    setOpen(false);
    if (nav === "teams") {
      // If already on home, just scroll
      if (pathname === "/") {
        window?.lenis?.scrollTo(`#${nav}`);
        return;
      }

      // If NOT on home:
      // 1. go to home
      // 2. wait for route
      // 3. scroll
      router.push("/");

      // small delay so DOM + lenis are ready
      setTimeout(() => {
        window?.lenis?.scrollTo(`#${nav}`);
      }, 1000);
    }

    if (nav == "/login" && pathname != "/login") {
      return router.push(`/login?redirect=${pathname}`);
    }

    router.push(nav);
  };

  return (
    <nav className="fixed select-none top-0 left-0 z-20 flex w-screen items-center justify-between bg-transparent px-10 py-3">
      <span className="cursor-target text-2xl">MASC</span>
      <div className="hidden md:flex max-w-sm flex-row flex-wrap gap-3">
        {navs.map((nav) => (
          <span
            onClick={() => handleNav(nav.path)}
            key={nav.name}
            className="flex flex-row justify-center items-center cursor-target group"
          >
            <div className="size-2 bg-slate-700 group-hover:bg-red-400" />
            <span className="text-xs p-2 lowercase">{nav.name}</span>
          </span>
        ))}
        <span
          className="flex flex-row justify-center items-center group cursor-target"
          onClick={() => handleNav(isAuth ? "/profile" : "/login")}
        >
          <div className="size-2 bg-slate-700 group-hover:bg-red-400" />
          <span className="text-xs p-2 ">{isAuth ? "profile" : "login"}</span>
        </span>
      </div>

      {/* MOBILE HAMBURGER */}
      <button className="md:hidden flex flex-col gap-1.5" onClick={() => setOpen(true)} aria-label="Open menu">
        <span className="w-6 h-[2px] bg-black" />
        <span className="w-4.5 h-[2px] bg-black" />
        <span className="w-3 h-[2px] bg-black" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed md:hidden top-0 right-0 w-screen min-h-screen bg-slate-300/99 z-40 flex flex-col"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setOpen(false)}
              className="p-6 text-blue-700 text-xl self-start rotate-45"
              aria-label="Close menu"
            >
              <IoMdAdd className="text-black" size={30} />
            </button>

            {/* LINKS */}
            <div className="flex flex-col gap-8 px-6 mt-4 flex-1">
              {navs.map((nav) => (
                <span
                  key={`${nav.name} mobile`}
                  onClick={() => handleNav(nav.path)}
                  className="text-[2.25rem] font-semibold tracking-tight capitalize cursor-pointer transition hover:translate-x-1 border-0 border-b border-slate-700"
                >
                  {nav.name}
                </span>
              ))}

              <span
                className="mt-4 text-[2.25rem] font-semibold tracking-tight cursor-pointer transition hover:translate-x-1 border-0 border-b border-slate-700"
                onClick={() => handleNav(isAuth ? "/profile" : "/login")}
              >
                {isAuth ? "Profile" : "Login"}
              </span>

              {/* BOTTOM NOTIFICATION */}
              <div className="cursor-target cursor-pointer flex flex-row justify-around items-center border-2 border-black rounded-sm w-[90%] h-[40%] p-1 m-1">
                <img src={event?.banner} className="h-full w-[30%] object-cover p-1" />
                <div className="flex flex-col justify-around items-start">
                  <h3 className="flex flex-row gap-1 justify-start items-center">
                    <div className="size-2 bg-red-400" />
                    <span className="text-xs p-2">Upcoming Event</span>
                  </h3>
                  <h2 className="cursor-target text-wrap">{event?.title}</h2>
                  <span className="text-xs">{new Date(event?.createdAt!).toDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
