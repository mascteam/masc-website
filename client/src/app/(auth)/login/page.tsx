"use client";

import { Lock, User2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import type { Variants } from "framer-motion";
import axiosInstance from "@/services/axios";

import Cookie from "js-cookie";
import { toasty } from "@/components/ToastProvider";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/user";

import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<{ moodleID: string; password: string }>({
    moodleID: "",
    password: "",
  });

  const { setUser, setAuth } = useUserStore();

  const router = useRouter();
  const redirectTo = useSearchParams().get("redirect");

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

  const handleLogin = async () => {
    try {
      const { moodleID, password } = loginData;

      if (!moodleID || !password) return toasty("an incomplete form cant be submitted");

      const { data } = await axiosInstance.post("/auth/login", loginData, { withCredentials: true });

      Cookie.set("jwt", data.token);

      setUser(data.userExist);
      setAuth(true);

      if (redirectTo) {
        redirectTo === "/login" ? router.push("/profile") : router.push(redirectTo);
      }
    } catch (error: any) {
      toasty(error.response.data.message);
      if (error.response.data.errors?.length > 0) {
        return error.response.data.errors.map((err: { path: string; message: string }) => toasty(err.message));
      }
    }
  };

  return (
    <section className=" min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl flex flex-col gap-10"
      >
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold uppercase">Login At masc</h1>
          <p className="mt-2 text-sm opacity-60">Continue with your Moodle credentials.</p>
        </div>

        {/* Moodle ID */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <User2 className="shrink-0" />

          <input
            className="flex-1 border-0 border-b bg-transparent outline-none uppercase text-lg cursor-target"
            placeholder="Moodle ID"
            type="text"
            value={loginData.moodleID}
            onChange={(e) =>
              setLoginData((p) => ({
                ...p,
                moodleID: e.target.value.toLowerCase(),
              }))
            }
          />
        </motion.div>

        {/* Password */}
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <Lock className="shrink-0" />

          <input
            className="flex-1 border-0 border-b bg-transparent outline-none text-lg cursor-target"
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((p) => ({
                ...p,
                password: e.target.value,
              }))
            }
          />
        </motion.div>

        {/* Button */}
        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className="flex justify-end">
          <motion.button
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="border-b text-lg uppercase tracking-wide  cursor-target"
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
