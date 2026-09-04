"use client";

import { IdCard, IdCardIcon, Lock, User2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";
import axiosInstance from "@/services/axios";

import Cookie from "js-cookie";
import { toasty } from "@/components/ToastProvider";

import { usePathname, useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/loading";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<{
    moodleID: string;
    password: string;
    name: string;
    department: string;
    division: string;
    year: string;
  }>({
    moodleID: "",
    password: "",
    name: "",
    department: "",
    division: "",
    year: "",
  });

  const departments = ["DS", "AIML", "IT", "COMP", "CIVIL", "MECH"];
  const divisions = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const years = ["FE", "SE", "TE", "BE"];

  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { moodleID, password, name, department, division, year } = registerData;

      if (!moodleID || !password || !name || !department || !division || !year)
        return toasty("incomplete form cant be submitted");

      const { data } = await axiosInstance.post("/auth/register", registerData, { withCredentials: true });

      Cookie.set("jwt", data.token);

      router.push("/profile");
    } catch (error: any) {
      if (error.message.response.data.errors.length > 0) {
        return error.response.data.errors.map((err: { path: string; message: string }) => toasty(err.message));
      }

      toasty("Failed To Register User");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl flex flex-col gap-10"
      >
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold uppercase">Register at masc</h1>
          <p className="text-sm opacity-60 mt-2">Enter your academic details to continue.</p>
        </div>

        {/* Basic */}
        <div className="flex flex-col gap-8">
          <motion.div
            custom={0}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 cursor-target"
          >
            <IdCard className="shrink-0" />

            <input
              className="flex-1 border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
              placeholder="Moodle ID"
              value={registerData.moodleID}
              onChange={(e) =>
                setRegisterData((p) => ({
                  ...p,
                  moodleID: e.target.value.toLowerCase(),
                }))
              }
            />
          </motion.div>

          <motion.div
            custom={1}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4 cursor-target"
          >
            <User2 className="shrink-0" />

            <input
              className="flex-1 border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData((p) => ({
                  ...p,
                  name: e.target.value,
                }))
              }
            />
          </motion.div>
        </div>

        {/* Academic */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-6"
        >
          <select
            className="flex-1 min-w-[180px] border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
            value={registerData.department}
            onChange={(e) =>
              setRegisterData((p) => ({
                ...p,
                department: e.target.value,
              }))
            }
          >
            <option className="" disabled value="">
              Department
            </option>

            {departments.map((dept) => (
              <option key={dept} value={dept} className="">
                {dept}
              </option>
            ))}
          </select>

          <select
            className="flex-1 min-w-[120px] border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
            value={registerData.division}
            onChange={(e) =>
              setRegisterData((p) => ({
                ...p,
                division: e.target.value,
              }))
            }
          >
            <option className="" disabled value="">
              Division
            </option>

            {divisions.map((div) => (
              <option key={div} value={div} className="">
                {div}
              </option>
            ))}
          </select>

          <select
            className="flex-1 min-w-[120px] border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
            value={registerData.year}
            onChange={(e) =>
              setRegisterData((p) => ({
                ...p,
                year: e.target.value,
              }))
            }
          >
            <option className="" disabled value="">
              Year
            </option>

            {years.map((year) => (
              <option key={year} value={year} className="">
                {year}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Password */}
        <motion.div
          custom={3}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 cursor-target "
        >
          <Lock className="shrink-0" />

          <input
            className="flex-1 border-0 border-b-2 border-black bg-transparent outline-none text-lg"
            placeholder="Password"
            type="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData((p) => ({
                ...p,
                password: e.target.value,
              }))
            }
          />
        </motion.div>

        {/* Button */}
        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className="flex justify-end">
          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`border-b-2 border-black text-lg uppercase tracking-wide cursor-target ${loading ? "text-gray-400" : "text-black"}`}
            onClick={handleRegister}
          >
            Submit Details
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
