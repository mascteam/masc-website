"use client";

import { ArrowLeft, ArrowLeftCircle, ArrowLeftFromLine, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { useRouter } from "next/navigation";

type BlogData = {
  id: string;
  title: string;
  content: string;
};

const blogs: BlogData[] = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eligendi.",
    content: "lorem 50",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eligendi.",
    content: "lorem 50",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eligendi.",
    content: "lorem 50",
  },
  {
    id: "4",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eligendi.",
    content: "lorem 50",
  },
  {
    id: "5",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eligendi.",
    content: "lorem 50",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BlogSection = () => {
  const router = useRouter();
  return (
    <section className="h-[70vh] md:h-screen md:min-h-[90vh] w-screen px-5 flex flex-col">
      <div>
        <h1 className="text-3xl md:text-4xl">
          <span className="cursor-target">Blogs</span> for <span className="cursor-target">nerds</span>
        </h1>

        <p className="hidden md:block max-w-lg mt-2 text-gray-500">
          Ideas, insights, and stories from MASC. Explore what we're learning, building, and thinking about.
        </p>
      </div>

      {/* BLOG LIST */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full"
      >
        {blogs.map((blog, index) => (
          <motion.div
            onClick={() => router.push(`/blogs/${blog.id}`)}
            key={blog.id}
            variants={rowVariants}
            whileHover="hover"
            className="group relative w-full border-b border-black overflow-hidden"
          >
            <motion.div
              variants={{
                hover: {
                  x: 8,
                  transition: {
                    duration: 0.66,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="flex items-center gap-4 py-5 px-3 md:py-6"
            >
              {/* NUMBER */}
              <span className="w-8 shrink-0 text-sm md:text-base text-gray-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* TITLE */}
              <h2 className="cursor-target w-full leading-tight md:text-2xl">{blog.title}</h2>

              {/* ARROW */}
              <motion.span
                variants={{
                  hover: {
                    rotate: 180,
                    transition: {
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="text-xl md:text-2xl"
              >
                <ArrowLeft size={30} />
              </motion.span>
            </motion.div>

            {/* HOVER LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              variants={{
                hover: {
                  scaleX: 1,
                  transition: {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-black"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex justify-end"
      >
        <Link href="/blogs" className="cursor-target flex items-center gap-3 text-sm md:text-base">
          <span className="text-xl border-b border-black pb-1">Read our catalogue</span>
        </Link>
      </motion.div>
    </section>
  );
};

export default BlogSection;
