"use client";

import axiosInstance from "@/services/axios";
import { useEffect, useState } from "react";

import { useUserStore } from "@/store/user";
import { toasty } from "@/components/ToastProvider";

export type MemberType = {
  _id: string;
  name: string;
  department: string;
  year: string;
  moodleID: string;
  division: string;
  role: string;
};

const ManageMembers = () => {
  const [inputData, setInputData] = useState<{ moodleID: string; role: string }>({ moodleID: "", role: "" });

  const [displayMembers, setDisplayMembers] = useState<MemberType[]>([]);

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

  const updateMember = async () => {
    if (!inputData) return;
    try {
      if (!displayMembers) throw new Error("org has 0 members, contact dev");
      const { data } = await axiosInstance.patch("/auth/update-role", inputData, { withCredentials: true });
      toasty(`${data.user.name} updated`);
      await fetchOrgDetails();
    } catch (error: any) {
      toasty("Failed to update role");
    } finally {
      setInputData({ moodleID: "", role: "" });
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
                  onClick={updateMember}
                  className="cursor-target border-b-2 border-black text-red-600 hover:opacity-70 transition"
                >
                  Update Member
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
              <table className="w-full border-collapse uppercase">
                <thead>
                  <tr className="border-y border-black text-left text-xs">
                    <th className="px-4 py-3 font-normal">Name</th>
                    <th className="px-4 py-3 font-normal">Role</th>
                    <th className="px-4 py-3 font-normal">Moodle ID</th>
                  </tr>
                </thead>

                <tbody>
                  {displayMembers.map((member) => (
                    <tr key={member._id} className="cursor-target border-b border-black">
                      <td className="px-4 py-5">{member.name}</td>
                      <td className="px-4 py-5">{member.role}</td>
                      <td className="px-4 py-5">{member.moodleID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="border-t border-black pt-6">
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
