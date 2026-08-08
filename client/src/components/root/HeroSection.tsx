import React from "react";

import { titleFont } from "@/app/layout";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const HeroSection = () => {
  return (
    <section className="relative flex h-screen w-screen flex-col items-center justify-center">
      <h1
        className={`${titleFont.className} hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-5 text-4xl md:text-6xl cursor-target p-2`}
      >
        Math & Science Club
      </h1>
      <h1
        className={`${titleFont.className} flex flex-col md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-5 text-4xl md:text-6xl cursor-target p-2`}
      >
        <span className="text-nowrap">Math &</span>
        <span className="text-nowrap">Science Club</span>
      </h1>

      <div className="absolute bottom-0 p-10 left-0 h-1/2 w-full flex justify-between items-end">
        <p className="w-full md:w-[40vw] cursor-target flex flex-col">
          <span className="uppercase text-lg"># Curiosity meets discovery.</span>
          <span className="text-xs md:max-w-lg text-gray-600">
            MASC is a Club fostering curiosity, critical thinking, and innovation through workshops, competitions,
            projects, and hands-on exploration.
          </span>
        </p>

        <div className="hidden cursor-target cursor-pointer md:flex flex-row justify-around items-center border-2 border-black rounded-sm w-[30%] h-1/2 p-x">
          <img
            src={"https://th.bing.com/th/id/OIP.sUzI9MNZRL8yQWHYt05PlQHaEK?w=320&h=180&c=7&r=0&o=7&pid=1.7&rm=3"}
            className="h-full w-[35%] object-cover p-1"
          />
          <div className="flex flex-col justify-around items-start">
            <h3 className="flex flex-row gap-1 justify-start items-center">
              <div className="size-2 bg-red-400" />
              <span className="text-xs p-2">Upcoming</span>
            </h3>
            <h2 className="cursor-target">Event Event Name Full </h2>
            <span className="text-xs">08 June, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
