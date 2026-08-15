

import { titleFont } from "@/app/layout";
import HeroToast from "./HeroToast";
import axiosInstance from "@/services/axios";
import { EventType } from '@/app/events/create/page';

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
  
        <HeroToast />
      </div>
    </section>
  );
}

export default HeroSection;
