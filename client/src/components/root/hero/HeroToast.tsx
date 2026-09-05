import { TypingAnimation } from "@/components/ui/typing-animation";

const elements = [
  "# Curiosity meets discovery.",
  "# Wonder sparks understanding.",
  "# Questions become possibilities.",
  "# Learning becomes creation.",
  "# Together, we inspire what's next.",
];

const HeroToast = () => {
  return (
    <p className="w-full md:w-[40vw] cursor-target flex flex-col">
      <TypingAnimation
        words={elements}
        blinkCursor={true}
        pauseDelay={2000}
        loop
        className="uppercase text-lg select-none"
      />
      <span className="text-xs md:max-w-lg text-gray-600">
        MASC is a Club fostering curiosity, critical thinking, and innovation through workshops, competitions, projects,
        and hands-on exploration.
      </span>
    </p>
  );
};

export default HeroToast;
