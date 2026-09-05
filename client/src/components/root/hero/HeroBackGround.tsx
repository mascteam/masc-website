import AeroShards from "@/components/AeroShards";
import React from "react";

const HeroBackGround = () => {
  return (
    <>
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
        shardSize={1}
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
        className="h-full w-full hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
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
        shardSize={0.25}
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
        className="h-full w-full md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default HeroBackGround;
