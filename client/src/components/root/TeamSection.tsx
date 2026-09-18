"use client";

import { useState } from "react";

import { motion } from "motion/react";

type MemberDataType = {
  name: string;
  role: string;
  linkedin: string | null;
  img: string;
};

type TeamDataType = {
  members: MemberDataType[];
  description: string;
};

const founder: MemberDataType[] = [
  {
    name: "Mehaan Churi",
    role: "Founder",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/352302de-cf3d-4644-acdc-ef397293e2ad-mehaan_churi.png",
  },
  {
    name: "Arav Palsule",
    role: "Co-Founder",
    linkedin: null,
    img: "",
  },
  {
    name: "Nikhil Sharma",
    role: "Founding Member",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/74244698-7390-48d1-9cef-4aebd53ff733-nikhil_sharma.png",
  },
];

const core: MemberDataType[] = [
  {
    name: "Mehaan Churi",
    role: "President",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/352302de-cf3d-4644-acdc-ef397293e2ad-mehaan_churi.png",
  },
  {
    name: "Veera Bandekar",
    role: "Vice President",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/9e490f6e-a2e6-40d4-9985-3949381a169e-veera_bandekar.png",
  },
  {
    name: "Nikhil Sharma",
    role: "RnD Head",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/74244698-7390-48d1-9cef-4aebd53ff733-nikhil_sharma.png",
  },
  {
    name: "Shreeyash Kulkarni",
    role: "Management Head",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/f5a88052-70f7-4164-ad85-b5bdbfc00cc9-shreeyash_kulkarni.png",
  },
  {
    name: "Niharika Jha",
    role: "Creative Head",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/6de38600-0a46-4b62-9ab9-5f93c3175d87-niharika_jha.png",
  },
];

const rnd: MemberDataType[] = [
  {
    name: "Shreeya Kadam",
    role: "Research Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/17e07b67-0e20-4939-a1b8-b24467209f3a-shreeya_kadam.png",
  },
  {
    name: "Arnav Dighe",
    role: "Research Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/92c067f2-ac9a-47c4-b1d1-05a5f5cbcd19-arnav_dighe.png",
  },
  {
    name: "Ojas Amrujkar",
    role: "Development Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/9ad0a933-de32-40f2-8072-0b1eb65fe8a6-ojas_amrujkar.png",
  },
];

const management: MemberDataType[] = [
  {
    name: "Rahi Chole",
    role: "Documentation Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/fb354418-5250-43b1-aed0-4ac9b5dcbcd5-rahi_chole.png",
  },
];

const creative: MemberDataType[] = [
  {
    name: "Tanvi Jadhav",
    role: "Publicity Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/9b63988a-b9ee-403c-bfa4-92c022472e76-tanvi_jadhav.png",
  },
  {
    name: "Rishikesh Deherkar",
    role: "Design Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/0cd2e5d2-dd73-4657-9cf3-022862b91134-rishikesh_deherkar.png",
  },
  {
    name: "Simran Jha",
    role: "Publicity Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/1a6eaeed-0124-412b-966e-1c9ab8f2996a-simran_jha.png",
  },
  {
    name: "Swara Bhagat",
    role: "Design Lead",
    linkedin: null,
    img: "https://vtivymomnqgoyiuxjidl.supabase.co/storage/v1/object/public/masc/teams/a0d53737-95fd-40bb-9aa6-4239627fb2bd-swara_bhagat.png",
  },
];

const teamData: Record<string, TeamDataType> = {
  founder: {
    description:
      "Focused on exploring scientific concepts, organizing technical activities, and promoting a culture of innovation and learning.",
    members: founder,
  },

  development: {
    description:
      "Responsible for building technical solutions, managing projects, and transforming ideas into working products.",
    members: rnd,
  },

  publicity: {
    description:
      "Handles outreach, promotions, and communication to ensure events and initiatives reach a wider audience.",
    members: creative,
  },

  cinemato: {
    description:
      "Captures and creates visual content, documenting events and producing engaging media for the community.",
    members: creative,
  },

  management: {
    description: "Coordinates operations, logistics, and planning to ensure smooth execution of events and activities.",
    members: management,
  },

  design: {
    description:
      "Creates visual identities, graphics, and branding materials that support the club's activities and presence.",
    members: creative,
  },

  core: {
    description: "Provides leadership, strategic direction, and oversight for all teams and major initiatives.",
    members: core,
  },
};

const TeamSection = () => {
  const [activeTeam, setActiveTeam] = useState("core");
  return (
    <div
      id="team"
      className="team h-screen w-screen xl:h-[60vh] border border-black flex flex-col xl:flex-row justify-start items-start overflow-hidden"
    >
      {Object.keys(teamData).map((name) => (
        <div
          key={name}
          className="border border-black relative flex flex-col xl:flex-row justify-center items-center xl:h-full w-full"
        >
          <TeamTitle name={name} activeTeam={activeTeam} setActiveTeam={setActiveTeam} />
          <TeamDetailsDesktop name={name} activeTeam={activeTeam} />
          <TeamDetailsMobile name={name} activeTeam={activeTeam} />
        </div>
      ))}
    </div>
  );
};

export default TeamSection;

type TeamComponentProps = {
  name: string;
  activeTeam: string;
  setActiveTeam: (name: string) => void;
};

const TeamTitle = ({ name, activeTeam, setActiveTeam }: TeamComponentProps) => {
  return (
    <h2
      onClick={() => setActiveTeam(name)}
      className={`${name === activeTeam ? "" : "cursor-target"} flex justify-start items-center xl:items-start text-xl xl:text-[10px] text-wrap w-full xl:w-[5vw] h-[4vh] xl:h-full py-px xl:py-2 px-2 xl:px-1 xl:absolute left-0 top-0 z-10 cursor-pointer`}
      key={name}
    >
      {name.split("").map((l, i) => (
        <span
          key={l + i}
          className={` ${i === 0 ? "uppercase" : "lowercase"} ${name === activeTeam ? "text-black" : "text-black/40"}`}
        >
          {l}
        </span>
      ))}
    </h2>
  );
};

const TeamDetailsDesktop = ({ name, activeTeam }: Pick<TeamComponentProps, "name" | "activeTeam">) => {
  const isVisible = name === activeTeam;
  const data = teamData[name];
  return (
    <motion.div
      animate={{
        width: isVisible ? "64vw" : 0,
      }}
      transition={{
        duration: 0.66,
      }}
      className="overflow-hidden hidden xl:flex flex-col w-[64vw]"
    >
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.66,
              },
            },
          }}
          className="flex flex-nowrap justify-center gap-1 p-7"
        >
          {data.members.map((member, index) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 },
              }}
              className="cursor-target cursor-pointer h-[35vh] w-[12vw] bg-black border border-black text-white flex justify-center items-center"
            >
              <img className="h-full w-full object-contain" src={member.img} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.4,
          delay: 0.25,
          ease: "easeOut",
        }}
        className="w-full flex justify-between items-start px-5"
      >
        <h1 className="flex flex-col">
          <span className="text-lg leading-none">Team</span>

          <motion.span
            initial={false}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 10,
            }}
            transition={{
              duration: 0.3,
              delay: 0.35,
            }}
            className={`capitalize text-2xl leading-none ${""}`}
          >
            {name}
          </motion.span>
        </h1>

        <motion.p
          initial={false}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 10,
          }}
          transition={{
            duration: 0.3,
            delay: 0.45,
          }}
          className="text-sm max-w-md text-left"
        >
          {data.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const TeamDetailsMobile = ({ name, activeTeam }: Pick<TeamComponentProps, "name" | "activeTeam">) => {
  const isVisible = name === activeTeam;
  const data = teamData[name];
  return (
    <motion.div
      initial={false}
      animate={{
        height: name === activeTeam ? "70vh" : 0,
        opacity: name === activeTeam ? 1 : 0,
      }}
      transition={{
        duration: 0.44,
        ease: "easeInOut",
      }}
      className={`flex flex-col xl:hidden w-full h-full`}
    >
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.66,
              },
            },
          }}
          className="flex flex-wrap justify-center items-center gap-1 p-1 w-full h-full overflow-hidden"
        >
          {data.members.map((member, index) => (
            <motion.div
              key={member.name}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 },
              }}
              className="cursor-target h-[28vh] w-[30vw] bg-black text-white flex justify-center border border items-center"
            >
              <img className="h-full w-full object-contain" src={member.img} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.4,
          delay: 0.25,
          ease: "easeOut",
        }}
        className="w-full flex flex-col justify-start items-start px-5"
      >
        <h1 className="flex flex-col mt-1">
          <span className="text-lg leading-none">Team</span>

          <motion.span
            initial={false}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 10,
            }}
            transition={{
              duration: 0.3,
              delay: 0.35,
            }}
            className={`capitalize text-2xl leading-none ${""}`}
          >
            {name}
          </motion.span>
        </h1>

        <motion.p
          initial={false}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 10,
          }}
          transition={{
            duration: 0.3,
            delay: 0.45,
          }}
          className="text-sm max-w-md text-left mt-px"
        >
          {data.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
