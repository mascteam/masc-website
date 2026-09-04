"use client";

import { CalendarPlus, Edit3, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/services/axios";
import { toasty } from "@/components/ToastProvider";

const AdminEventNavigationPage = () => {
  const router = useRouter();

  const [editSlug, setEditSlug] = useState("");
  const [deleteSlug, setDeleteSlug] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fieldVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleEdit = () => {
    const slug = editSlug.trim();

    if (!slug) {
      return toasty("event slug is required");
    }

    router.push(`/event/${slug}/update`);
  };

  const handleDelete = async () => {
    const slug = deleteSlug.trim();

    if (!slug) {
      return toasty("event slug is required");
    }

    try {
      setDeleting(true);

      await axiosInstance.delete(`/events/${slug}`);

      toasty("event deleted successfully");
      setDeleteSlug("");
    } catch (error: any) {
      toasty(error?.response?.data?.message || "failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="min-h-screen px-4 py-12 mt-5 sm:px-6 sm:py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto flex w-full max-w-2xl flex-col gap-10 sm:gap-12"
      >
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold uppercase sm:text-4xl">Event Administration</h1>

          <p className="mt-2 text-sm opacity-60">Manage events and perform administrative actions.</p>
        </div>

        {/* Create */}
        <motion.div
          custom={0}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 sm:gap-4"
        >
          <CalendarPlus className="mt-1 size-5 shrink-0 sm:size-6" />

          <div className="flex flex-1 items-center justify-between gap-4 border-b pb-3">
            <div>
              <h2 className="text-base font-medium uppercase sm:text-lg">Create Event</h2>

              <p className="text-xs opacity-50 sm:text-sm">Create a new event.</p>
            </div>

            <Link href="/events/create" className="shrink-0 cursor-target text-base uppercase tracking-wide sm:text-lg">
              Create
            </Link>
          </div>
        </motion.div>

        {/* Edit */}
        <motion.div
          custom={1}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 sm:gap-4"
        >
          <Edit3 className="mt-1 size-5 shrink-0 sm:size-6" />

          <div className="flex-1">
            <h2 className="text-base font-medium uppercase sm:text-lg">Edit Event</h2>

            <p className="mb-4 text-xs opacity-50 sm:text-sm">Enter the event slug to edit an existing event.</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Event slug"
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEdit();
                  }
                }}
                className="min-w-0 flex-1 border-0 border-b bg-transparent py-2 text-base uppercase outline-none cursor-target sm:text-lg"
              />

              <motion.button
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleEdit}
                className="self-end border-b text-base uppercase tracking-wide cursor-target sm:self-auto sm:text-lg"
              >
                Edit
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Delete */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 sm:gap-4"
        >
          <Trash2 className="mt-1 size-5 shrink-0 text-red-600 sm:size-6" />

          <div className="flex-1">
            <h2 className="text-base font-medium uppercase text-red-600 sm:text-lg">Delete Event</h2>

            <p className="mb-4 text-xs opacity-50 sm:text-sm">Permanently delete an event using its slug.</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Event slug"
                value={deleteSlug}
                onChange={(e) => setDeleteSlug(e.target.value)}
                className="min-w-0 flex-1 border-0 border-b border-red-600/50 bg-transparent py-2 text-base uppercase outline-none focus:border-red-600 cursor-target sm:text-lg"
              />

              <motion.button
                disabled={deleting}
                whileHover={!deleting ? { x: 4 } : undefined}
                whileTap={!deleting ? { scale: 0.96 } : undefined}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleDelete}
                className={`self-end border-b border-red-600 text-base uppercase tracking-wide text-red-600 cursor-target sm:self-auto sm:text-lg ${
                  deleting ? "opacity-40" : ""
                }`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdminEventNavigationPage;
