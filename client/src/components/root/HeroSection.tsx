import { globalFont, titleFont } from "@/app/layout";
import HeroToast from "./HeroToast";
import axiosInstance from "@/services/axios";
import { EventType } from "@/app/events/create/page";
import AeroShards from "../AeroShards";
import { Cover } from "../ui/cover";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const HeroSection = () => {
  return (
    <section className="overflow-hidden relative flex h-screen w-screen flex-col items-center justify-center">
      <AeroShards
        backgroundColor="#F1F5F9"
        shardColor="#080114"
        accentColor="#c41f1f"
        placement="full"
        flow="stream"
        material="pearl"
        detail="balanced"
        effect="none"
        scale={0.65}
        spread={1}
        depth={1}
        speed={0.4}
        spin={0.5}
        interaction="repel"
        density={0.6}
        shardSize={0.35}
        stretch={0.95}
        turbulence={1}
        glow={1}
        edgeSoftness={1.6}
        bloom={0.4}
        grain={0.05}
        chromaticAberration={0.0075}
        transitionDuration={1}
        interactionRadius={1.5}
        interactionStrength={0.5}
        rippleIntensity={1}
        holdToGather
        paused={false}
        className="h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <section className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-screen w-screen items-center justify-center">
        <CardContainer className="h-full w-full">
          <CardBody

            className={`${titleFont.className} flex h-full w-full flex-col items-center justify-center select-none p-2`}
          >
            <CardItem  translateZ={20} className="text-sm text-gray-500 md:text-xl">
              Math & Applied Science Club
            </CardItem>

            <div className="mt-5 flex flex-col items-center justify-center gap-2">
              <span className={`${globalFont.className} flex flex-nowrap justify-center items-center text-center text-xl capitalize md:text-5xl`}>
                <CardItem translateX={-40} translateZ={70}>one idea</CardItem>
                <Cover>
                  <span className="cursor-target uppercase underline underline-offset-4 decoration-red-400">leads</span>
                </Cover>
                <CardItem translateX={40} translateZ={70}>to another,</CardItem>
              </span>

              <span
                className={`${globalFont.className} flex flex-col md:flex-row flex-nowrap justify-center items-center text-center text-[0.9rem] capitalize md:text-5xl`}
              >
                <CardItem translateX={-50} translateZ={50}>one person pushes another</CardItem>
                <Cover>
                  <span className="cursor-target uppercase underline underline-offset-8 decoration-red-400">
                    forward
                  </span>
                </Cover>
                <CardItem translateX={50} translateZ={50}>.</CardItem>
              </span>
            </div>

            <CardItem translateY={-30} translateZ={20} className="mt-10 max-w-[80vw] md:max-w-xl text-center text-xs text-gray-500 md:text-xl">
              At MASC, we believe growth happens when curious people come together. We learn. We build. We share. And
              somewhere along the way, we inspire someone else to start.
            </CardItem>
          </CardBody>
        </CardContainer>
      </section>
      <div className="absolute bottom-0 p-2 mb-10 md:mb-0 md:p-10 left-0 h-1/2 w-full flex justify-between items-end">
        <p className="w-full md:w-[40vw] cursor-target flex flex-col">
          <span className="uppercase text-lg select-none"># Curiosity meets discovery.</span>
          <span className="text-xs md:max-w-lg text-gray-600">
            MASC is a Club fostering curiosity, critical thinking, and innovation through workshops, competitions,
            projects, and hands-on exploration.
          </span>
        </p>

        <HeroToast />
      </div>
    </section>
  );
};

export default HeroSection;
