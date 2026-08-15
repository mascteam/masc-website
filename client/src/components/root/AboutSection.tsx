const AboutSection = () => {
  return (
    <section className="h-[70vh] md:h-screen w-screen flex flex-col md:flex-row justify-around md:justify-around items-center px-5 md:px-20 uppercase">
      <div className="w-full md:w-1/2">
        <span className="flex flex-nowrap gap-1 justify-start items-center">
          <div className="size-2 bg-slate-700" />
          <span className="text-xs p-2 cursor-target ">Idea Behind MASC</span>
        </span>
        <h1 className="cursor-target text-4xl md:max-w-lg">EXPLORING THE <br/> BEAUTY OF <br/> MATH AND SCIENCE</h1>
      </div>
      <div className="w-full md:w-1/2">
        <p className="uppercase flex flex-col justify-around space-y-10 md:p-2 md:max-w-lg">
          <span className="cursor-target text-sm text-wrap p-1">
            MASC is a student-led Mathematics and Science Club that brings together curious minds through workshops,
            competitions, and innovative projects. Our goal is not just to organize events, but to inspire curiosity and
            encourage learning beyond the classroom.
          </span>
          <span className="cursor-target text-sm text-wrap p-1">
            Every event is designed to spark ideas, challenge perspectives, and bring students together to explore,
            create, and discover. Because the best learning begins with a question.
          </span>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
