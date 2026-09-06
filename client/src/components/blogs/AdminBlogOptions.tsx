"use client";

import { useUserStore } from "@/store/user";
import Link from "next/link";
import { toasty } from "../ToastProvider";

const AdminBlogOptions = ({ slug }: { slug: string }) => {
  const { user } = useUserStore();
  return (
    <>
      {user?.role === "ORGANIZOR" && (
        <div className="mt-20 w- pt-8 border-t border-white/10">
          <h2 className="text-sm uppercase tracking-widest textgray-600 mb-8">Admin Actions</h2>
          <div className=" flex flex-col md:flex-row justify-start items-start gap-2 md:gap-x-5">
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              <Link
                href={`${slug}/update`}
                className="cursor-target border-b-2 border-black hover:opacity-70 transition text-red-400"
              >
                Edit This Blog
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              <Link
                onClick={() => {
                  navigator.clipboard.writeText(slug);
                  toasty("event slug has been copied");
                }}
                href={`/admin/blogs`}
                className="cursor-target border-b-2 border-black hover:opacity-70 transition text-red-400"
              >
                Delete This Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlogOptions;
