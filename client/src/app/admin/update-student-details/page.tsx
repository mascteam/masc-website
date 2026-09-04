"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User2, Lock, Mail, GraduationCap, Building2, Users, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type registerDataType = {
  moodleID: string;
  password: string;
  name: string;
  division: string;
  department: string;
  year: string;
};

import axiosInstance from "@/services/axios";

const departments = ["DS", "AIML", "IT", "COMP", "CIVIL", "MECH"];
const divisions = ["A", "B", "C", "D", "E", "F", "G", "H"];
const years = ["FE", "SE", "TE", "BE"];

const initialUpdateData: registerDataType = {
  moodleID: "",
  password: "",
  name: "",
  division: "",
  department: "",
  year: "",
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.3,
    },
  }),
};

const AdminPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [updateData, setUpdateData] = useState<registerDataType>(initialUpdateData);

  const updateField = (field: keyof registerDataType, value: string) => {
    setUpdateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const findUser = async () => {
    if (search.length !== 8) {
      toast.error("Moodle ID must be 8 characters long");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.get(`/auth/find/${search}`, { withCredentials: true });

      const { moodleID, name, department, division, year }: registerDataType = data.user;

      setUpdateData({
        moodleID,
        name,
        department,
        division,
        year,
        password: "",
      });

      toast.success("User found");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.patch("/auth/update", updateData, { withCredentials: true });

      toast.success(data.message);

      setSearch("");
      setUpdateData(initialUpdateData);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex w-full max-w-4xl flex-col gap-12"
      >
        {/* Header */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-60">MASC / ADMIN / USERS</p>

          <h1 className="mt-2 text-4xl font-bold uppercase">Manage Users</h1>

          <p className="mt-2 text-sm opacity-60">Find a member and update their account information.</p>
        </div>

        {/* Search */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          <p className="text-xs uppercase tracking-widest opacity-60">Find User</p>

          <div className="flex items-center gap-4">
            <Search className="shrink-0" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Moodle ID"
              className="flex-1 border-0 border-b bg-transparent py-2 text-lg uppercase outline-none cursor-target"
            />

            <motion.button
              type="button"
              onClick={findUser}
              disabled={loading}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="border-b text-sm uppercase tracking-wide cursor-target disabled:text-gray-400"
            >
              {loading ? "Searching..." : "Find"}
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t-2 border-black" />

        {/* User fields */}
        <div className="flex flex-col gap-7">
          <p className="text-xs uppercase tracking-widest opacity-60">User Information</p>

          {/* Moodle ID */}
          <motion.div
            custom={1}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <GraduationCap className="shrink-0" />

            <input
              type="text"
              value={updateData.moodleID}
              onChange={(e) => updateField("moodleID", e.target.value)}
              placeholder="Moodle ID"
              className="flex-1 border-0 border-b bg-transparent py-2 text-lg outline-none cursor-target"
            />
          </motion.div>

          {/* Name */}
          <motion.div
            custom={2}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <User2 className="shrink-0" />

            <input
              type="text"
              value={updateData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Full Name"
              className="flex-1 border-0 border-b bg-transparent py-2 text-lg outline-none cursor-target"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            custom={4}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <Lock className="shrink-0" />

            <input
              type="password"
              value={updateData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="New Password"
              className="flex-1 border-0 border-b bg-transparent py-2 text-lg outline-none cursor-target"
            />
          </motion.div>

          {/* Select fields */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            <motion.div
              custom={5}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 border-b"
            >
              <Building2 className="shrink-0" size={20} />

              <select
                value={updateData.department}
                onChange={(e) => updateField("department", e.target.value)}
                className="w-full bg-transparent py-2 text-sm uppercase outline-none cursor-target"
              >
                <option value="">Department</option>

                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              custom={6}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 border-b"
            >
              <Users className="shrink-0" size={20} />

              <select
                value={updateData.division}
                onChange={(e) => updateField("division", e.target.value)}
                className="w-full bg-transparent py-2 text-sm uppercase outline-none cursor-target"
              >
                <option value="">Division</option>

                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              custom={7}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 border-b"
            >
              <GraduationCap className="shrink-0" size={20} />

              <select
                value={updateData.year}
                onChange={(e) => updateField("year", e.target.value)}
                className="w-full bg-transparent py-2 text-sm uppercase outline-none cursor-target"
              >
                <option value="">Year</option>

                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          custom={8}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between border-t-2 border-black pt-6"
        >
          <motion.button
            type="button"
            onClick={() => {
              setUpdateData(initialUpdateData);
              setSearch("");
            }}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.96 }}
            className="text-sm uppercase cursor-target"
          >
            Clear
          </motion.button>

          <motion.button
            type="button"
            onClick={updateUser}
            disabled={loading}
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 300,
            }}
            className="border-b text-lg uppercase tracking-wide cursor-target disabled:text-gray-400"
          >
            {loading ? "Updating..." : "Update User"}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdminPage;
