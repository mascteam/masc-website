  import * as motion from "motion/react-client";

  const AboutSection = () => {
    return (
      <section className="border-t h-[60vh] md:h-[70vh] w-screen flex flex-col md:flex-row justify-around md:justify-around items-center px-5 md:px-20 uppercase">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="flex flex-nowrap gap-1 justify-start items-center">
            <div className="size-2 bg-slate-700" />
            <span className="text-xs p-2 cursor-target">Idea Behind MASC</span>
          </span>

          <h1 className="cursor-target text-lg md:text-4xl md:max-w-lg flex flex-col justify-start items-start">
            <span className="flex flex-row">
              EXPLORING THE <span className="flex ml-2 md:hidden">BEAUTY OF</span>
            </span>
            <span className="hidden md:flex">BEAUTY OF</span>
            <span>MATH AND SCIENCE</span>
          </h1>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
        >
          <p className="uppercase flex flex-col justify-around space-y-10 md:p-2 md:max-w-lg">
            <span className="cursor-target text-xs md:text-sm text-wrap p-1">
              MASC is a student-led Mathematics and Science Club that brings together curious minds through workshops,
              competitions, and innovative projects. Our goal is not just to organize events, but to inspire curiosity and
              encourage learning beyond the classroom.
            </span>

            <span className="cursor-target text-xs md:text-sm text-wrap p-1">
              Every event is designed to spark ideas, challenge perspectives, and bring students together to explore,
              create, and discover. Because the best learning begins with a question.
            </span>
          </p>
        </motion.div>
      </section>
    );
  };

  export default AboutSection;
