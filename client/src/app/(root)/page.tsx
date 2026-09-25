import AboutSection from "@/components/root/AboutSection";
import BlogSection from "@/components/root/BlogSection";
import EventSection from "@/components/root/EventSection";
import HeroSection from "@/components/root/HeroSection";
import TeamSection from "@/components/root/TeamSection";
import { Marquee } from "@/components/ui/marquee";
import { poppins } from "@/lib/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "MASC is the Maths & Applied Sciences Club at APSIT, bringing students together through mathematics, science, technology, events, workshops, and exploration.",
  alternates: {
    canonical: "/",
  },
};

const Rootpage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      {/* <Marquee className=" border-t-2 border-black select-none">
        <p
          className={`font-mono text-[10vh] md:text-[15vh] font-bold text-black [-webkit-text-stroke:2px_black] uppercase`}
        >
          <span className={`${poppins.className} hidden md:flex`}>Minds Behind masc</span>
          <span className={`${poppins.className} md:hidden flex`}>Team masc</span>
        </p>
      </Marquee>
      <TeamSection /> */}
      <EventSection />
      <BlogSection />
    </>
  );
};

export default Rootpage;
