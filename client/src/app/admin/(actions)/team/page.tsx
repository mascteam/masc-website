"use client";

import axiosInstance from "@/services/axios";
import { useEffect, useState } from "react";

import { useUserStore } from "@/store/user";
import { toasty } from "@/components/ToastProvider";

export type MemberType = { name: string; department: string; year: string; moodleID: string; division: string };

const ManageMembers = () => {
  const [inputData, setInputData] = useState<{ moodleID: string; role: string }>({ moodleID: "", role: "" });

  const [displayMembers, setDisplayMembers] = useState<{ _id: string; moodleID: string; name: string }[]>([]);

  const { user } = useUserStore();

  const fetchOrgDetails = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/find-members");
      setDisplayMembers(() => data.members.map((member: string) => member));
    } catch (error: any) {
      toasty(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrgDetails();
  }, [user]);

  const updateRole = async () => {
    if (!inputData) return;
    try {
      if (!displayMembers) throw new Error("org has 0 members, contact dev");
      const { data } = await axiosInstance.patch(
        "/auth/update-role",
        inputData,
        { withCredentials: true },
      );

      setDisplayMembers([...displayMembers, data.user]);
      toasty(`${data.user.name} added`);
    } catch (error: any) {
      toasty("Failed to add id");
    } finally {
      setInputData({moodleID : "", role : ""});
    }
  };

  return (
    displayMembers && (
      <section className="w-[90vw] min-h-[80vh] mx-auto py-10 mt-15">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left */}
          <div className="w-full lg:w-[35%] flex flex-col gap-8">
            <div>
              <h1 className="text-5xl font-bold uppercase">Members</h1>

              <p className="mt-3 text-xs uppercase text-gray-600">Manage organization members</p>
            </div>

            <div className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Moodle ID"
                value={inputData.moodleID}
                onChange={(e) => setInputData((p) => ({ ...p, moodleID: e.target.value }))}
                className="border-0 border-b-2 border-black bg-transparent outline-none"
              />

              <select
                className="flex-1 min-w-[180px] border-0 border-b-2 border-black bg-transparent outline-none uppercase text-lg"
                value={inputData.role}
                onChange={(e) =>
                  setInputData((p) => ({
                    ...p,
                    role: e.target.value,
                  }))
                }
              >
                <option className="" disabled value="">
                  Roles
                </option>

                {["USER", "ORGANIZOR", "ADMIN"].map((role) => (
                  <option key={role} value={role} className="">
                    {role}
                  </option>
                ))}
              </select>

              <div className="flex gap-8">
                <button
                  onClick={updateRole}
                  className="cursor-target border-b-2 border-black hover:opacity-70 transition"
                >
                  Add Member
                </button>

                <button
                  onClick={updateRole}
                  className="cursor-target border-b-2 border-black text-red-600 hover:opacity-70 transition"
                >
                  Remove Member
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-6">
                Members can edit the organization, create events and manage registrations.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:flex-1 flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-semibold uppercase">Current Members</h2>

              <p className="mt-2 text-xs uppercase text-gray-600">{displayMembers.length} Members</p>
            </div>

            {displayMembers.length ? (
              <div className="border-t border-white/10">
                {displayMembers.map((member) => (
                  <div
                    key={member._id}
                    className="cursor-target flex justify-between items-center border-b-2 border-black border-white/10 py-5"
                  >
                    <span>{member.name}</span>
                    <span>{member.moodleID}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-t border-white/10 pt-6">
                <span className="text-gray-600">No members added yet.</span>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default ManageMembers;
