"use client";

import { useCoverStore } from "@/store/cover";

const HeroMainContent = () => {
  return (
    <section className="absolute boder top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-screen w-screen items-center justify-center gap-10">
      <DesktopMainContent />
      <MobileMainContent />
    </section>
  );
};

export default HeroMainContent;

const MobileMainContent = () => {
  return (
    <section className="flex md:hidden flex-col px-4 pt-8 pb-20">
      <div className="relative">
        <span className="block text-[clamp(3.5rem,18vw,6rem)] leading-[0.8] tracking-[-0.06em]">Maths</span>

        <p className="mt-4 ml-1 max-w-[220px] text-[11px] leading-relaxed text-neutral-500">
          Exploring the ideas that shape our world.
        </p>
      </div>

      <div className="flex w-full items-center justify-center py-10">
        <span className="text-[7rem] leading-none font-light ">&</span>
      </div>

      <div className="relative w-[90%]">
        <span className="block text-[1.4rem] leading-none tracking-tight">Applied</span>

        <span className="mt-1 block text-[3.8rem] leading-[0.85] tracking-[-0.05em]">Sciences</span>

        <p className="mt-5 max-w-[260px] text-[11px] leading-relaxed text-neutral-500">
          Learn, Compete & Grow alongside a community driven by curiosity and innovation.
        </p>
      </div>
    </section>
  );
};

const DesktopMainContent = () => {
  const { setHovered } = useCoverStore();

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="hidden md:flex flex-row justify-center items-center p-2 cursor-target"
    >
      <div className="flex flex-col justify-center items-start mb-10">
        <span className="flex flex-row items-center gap-x-5 text-8xl">
          <span>Maths</span>
          <span>&</span>
        </span>
        <p className="text-sm max-w-sm">Exploring the ideas that shape our world.</p>
      </div>

      <div className="flex flex-col justify-center items-start mt-10">
        <span className="flex flex-col justify-center items-start">
          <span className="text-3xl">Applied</span>
          <span className="text-8xl">Sciences</span>
        </span>
        <p className="text-sm max-w-md">
          Learn, Compete & Grow along side a community driven by curiosity and innovation.
        </p>
      </div>
    </section>
  );
};
