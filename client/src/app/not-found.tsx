import * as motion from "motion/react-client";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-screen h-[60vh] flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl font-bold"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-md md:text-xl opacity-70 text-center px-10"
        ></motion.p>

        <motion.div
          
          className="text-sm underline cursor-target p-1"
        >
          <Link href="/">Go back</Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;
