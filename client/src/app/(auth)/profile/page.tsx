"use client";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/user";
import LoadingPage from "@/app/loading";
import Link from "next/link";

import Cookies from "js-cookie";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, setUser, setAuth, getUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  if (!user) {
    return <LoadingPage />;
  }

  const handleLogout = async () => {
    Cookies.remove("jwt");
    setUser(null);
    setAuth(false);
    router.push("/");
  };

  return (
    <section className=" min-h-screen w-screen overflow-x-hidden px-6 py-16">
      <div className="border-b-2 border-black pb-8">
        <h1 className="text-3xl font-black uppercase">{user.name}</h1>

        <p className="text-lg opacity-60">{user.moodleID}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 py-10">
        <div className="space-y-3">
          <p className="text-xs uppercase text-gray-600">Department</p>
          <h2 className="text-2xl">{user.department}</h2>

          <p className="text-xs uppercase text-gray-600 pt-4">Year</p>
          <h2 className="text-2xl">{user.year}</h2>

          <p className="text-xs uppercase text-gray-600 pt-4">Division</p>
          <h2 className="text-2xl">{user.division}</h2>
        </div>

        <div className="flex flex-col gap5">
          <div>
            <p className="text-xs uppercase text-gray-600">Joined</p>
            <h2 className="text-xl md:text-4xl mt-2">
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </h2>
          </div>
          <div className="hidden md:flex flex-col mt-5">
            <p className="text-xs uppercase text-gray-600">Last Updated</p>
            <h2 className="text-xl md:text-4xl mt-2">
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </h2>
          </div>
        </div>

        <div className="md:text-right flex flex-col gap-2 justify-start items-end">
          <Link href="#" className="cursor-target underline underline-offset-4">
            Update Details
          </Link>
          {user.role === "ORGANIZOR" && (
            <Link className="cursor-target underline underline-offset-4" href="/admin/nav">
              Admin Navigation
            </Link>
          )}
          <button onClick={handleLogout} className="cursor-target underline underline-offset-4 text-red-400">
            Log Out
          </button>
        </div>
      </div>

      <div className="border-t-2 border-black pt-10">
        <h2 className="text-3xl mb-8">Events ({user.registeredEvents.length})</h2>

        <div className="space-y-4">
          {user.registeredEvents.length === 0 ? (
            <p className="text-gray-600">No registrations.</p>
          ) : (
            user.registeredEvents.map((event, i) => (
              <div key={event._id} className="flex gap-6 border-b-2 border-black pb-3">
                <span className="opacity-40">{String(i + 1).padStart(2, "0")}</span>

                <span className="text-xl">{event.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
