"use client";

import { motion } from "motion/react";
import { Users, PenLine, CalendarDays, Image, QrCode } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "manage website access",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "update student details",
    href: "/admin/update-student-details",
    icon: Image,
  },
  {
    label: "Manage Blogs",
    href: "/admin/blogs",
    icon: PenLine,
  },
  {
    label: "Manage Events",
    href: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "convert image → URL",
    href: "/admin/img-to-url",
    icon: Image,
  },

  {
    label: "convert URL → QR",
    href: "/admin/url-to-qr",
    icon: QrCode,
  },
];

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.35,
    },
  }),
};

const AdminNavigation = () => {
  const pathname = usePathname();

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl flex flex-col gap-10"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] opacity-60">MASC / ADMIN</p>

          <h1 className="mt-2 text-4xl font-bold uppercase">Administration</h1>

          <p className="mt-2 text-sm opacity-60">Manage the things that keep the website alive.</p>
        </div>

        <nav className="flex flex-col">
          {navigation.map((item, index) => {
            const Icon = item.icon;

            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <motion.div key={item.href} custom={index} variants={itemVariants} initial="hidden" animate="visible">
                <Link
                  href={item.href}
                  className={`group flex items-center gap-4 border-b py-5 cursor-target ${
                    active ? "border-black" : ""
                  }`}
                >
                  <Icon size={22} strokeWidth={1.8} className="shrink-0" />

                  <span
                    className={`flex-1 text-xl uppercase transition-opacity ${
                      active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>

                  <motion.span initial={{ x: -6, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="text-xl">
                    →
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>
    </section>
  );
};

export default AdminNavigation;
