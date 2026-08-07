"use client";

import Link from "next/link";

const navs = ["home", "teams", "events", "blogs","register"];

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isAuth = false;

  return (
    <nav className="fixed top-0 left-0 z-20 flex w-screen items-center justify-between bg-transparent px-10 py-3">
      <span className="cursor-target text-2xl">MASC</span>
      <div className="hidden md:flex max-w-sm flex-row flex-wrap gap-3">
        {navs.map((nav) => (
          <Link href={nav} key={nav} className="flex flex-row justify-center items-center">
            <div className="size-2 bg-slate-700" />
            <span className="text-xs cursor-target p-2">{nav}</span>
          </Link>
        ))}
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
                <Link
                  key={nav}
                  href={nav}
                  className="text-[2.25rem] font-semibold tracking-tight capitalize cursor-pointer transition hover:translate-x-1 border-0 border-b border-slate-700"
                >
                  {nav}
                </Link>
              ))}

              <span
                className="mt-4 text-[2.25rem] font-semibold tracking-tight cursor-pointer transition hover:translate-x-1 border-0 border-b border-slate-700"
                onClick={() => {
                  setOpen(false);
                  router.push(isAuth ? "/profile" : "/login");
                }}
              >
                {isAuth ? "Profile" : "Login"}
              </span>

            {/* BOTTOM NOTIFICATION */}
            <div className="cursor-target cursor-pointer flex flex-row justify-around items-center border-2 border-black rounded-sm w-[90%] h-[40%] p-1 m-1">
              <img
                src={"https://th.bing.com/th/id/OIP.sUzI9MNZRL8yQWHYt05PlQHaEK?w=320&h=180&c=7&r=0&o=7&pid=1.7&rm=3"}
                className="h-full w-[30%] object-cover p-1"
              />
              <div className="flex flex-col justify-around items-start">
                <h3 className="flex flex-row gap-1 justify-start items-center">
                  <div className="size-2 bg-red-400" />
                  <span className="text-xs p-2">Upcoming</span>
                </h3>
                <h2 className="cursor-target text-wrap">Event Event Name Full </h2>
                <span className="text-xs">08 June, 2026</span>
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
