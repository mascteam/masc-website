"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";
import axiosInstance from "@/services/axios";

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

const TeamSection = () => {
  const [activeTeam, setActiveTeam] = useState("Core");
  const [teamData, setTeamData] = useState<Record<string, TeamDataType>>({});

  useEffect(() => {
    const fetchTeamJson = async () => {
      try {
        const { data } = await axiosInstance.get("/teams", { withCredentials: true });
        setTeamData(data);
      } catch (error: any) {
        setTeamData({});
      }
    };

    fetchTeamJson();
  }, []);

  return (
    teamData && (
      <div
        id="team"
        className="team h-[125vh] lg:h-screen w-screen xl:h-[60vh] border border-black flex flex-col xl:flex-row justify-start items-start overflow-hidden"
      >
        {Object.keys(teamData).map((name) => (
          <div
            key={name}
            className="border border-black relative flex flex-col xl:flex-row justify-center items-center xl:h-full w-full"
          >
            <TeamTitle name={name} activeTeam={activeTeam} setActiveTeam={setActiveTeam} />
            <TeamDetailsDesktop teamData={teamData} name={name} activeTeam={activeTeam} />
            <TeamDetailsMobile teamData={teamData} name={name} activeTeam={activeTeam} />
          </div>
        ))}
      </div>
    )
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

const TeamDetailsDesktop = ({
  teamData,
  name,
  activeTeam,
}: {
  teamData: Record<string, TeamDataType>;
  name: string;
  activeTeam: string;
}) => {
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
              <img className="h-full w-full object-cover" src={member.img} />
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

const TeamDetailsMobile = ({
  teamData,
  name,
  activeTeam,
}: {
  teamData: Record<string, TeamDataType>;
  name: string;
  activeTeam: string;
}) => {
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
              <img className="h-full w-full object-cover" src={member.img} />
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
