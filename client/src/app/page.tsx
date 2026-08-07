import AboutSection from "@/components/root/AboutSection";
import BlogSection from "@/components/root/BlogSection";
import EventSection from "@/components/root/EventSection";
import HeroSection from "@/components/root/HeroSection";
import TeamSection from "@/components/root/TeamSection";
import { Marquee } from "@/components/ui/marquee";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

const Rootpage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Marquee className=" border-t-2 border-black">
        <h1
          className={`font-mono text-[10vh] md:text-[15vh] font-bold text-black [-webkit-text-stroke:2px_white] uppercase ${poppins.className}`}
        >
          <span className="hidden md:flex">Minds Behind masc</span>
          <span className="md:hidden flex">Team masc</span>
        </h1>
      </Marquee>
      <TeamSection />
      <EventSection />
      <BlogSection />
    </>
  );
};

export default Rootpage;
