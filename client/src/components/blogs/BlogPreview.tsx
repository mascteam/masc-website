import Link from "next/link";

import * as motion from "motion/react-client";
import { Blog } from "@/app/blogs/[slug]/page";

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

const BlogPreview = ({ blogContent }: { blogContent: Blog }) => {
  return (
    <section className="w-[95%] border-black my-2">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full"
      >
        <motion.div
          key={blogContent.createdAt}
          variants={rowVariants}
          whileHover="hover"
          className="group relative w-full border-b border-black "
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
            className="flex items-center gap-4 py-3"
          >
            {/* TITLE */}
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center ">
              <Link href={`/blogs/${blogContent.slug}`}>
                <h1 className="text-lg md:text-2xl select-none cursor-target md:px-3">{blogContent.title}</h1>
              </Link>
              <span className="text-xs mt-2">{new Date(blogContent.createdAt!).toDateString()}</span>
            </div>
          </motion.div>

          <p
            className="text-black/50 text-wrap mb-2 text-xs md:text-sm"
            dangerouslySetInnerHTML={{
              __html:
                blogContent.content.length > 500 ? blogContent.content.slice(0, 500) + "..." : blogContent.content,
            }}
          ></p>

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
            className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-black"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogPreview;
