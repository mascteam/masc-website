import Link from "next/link";

const navs = ["home", "teams", "events", "blogs", "register"];

const socials = [
  {
    name: "instagram",
    link: "https://instagram.com/masc",
  },
  {
    name: "linkedin",
    link: "https://linkedin.com/company/masc",
  },
  {
    name: "github",
    link: "https://github.com/masc",
  },
  {
    name: "whatsapp",
    link: "https://whatsapp.com/masc",
  },
];

const Footer = () => {
  return (
    <footer className="h-[60vh] md:h-[50vh] w-screen bg-black cursor-auto text-white px-5 md:px-10 flex flex-col md:flex-row justify-between">
      {/* CTA */}
      <div className="pt-5">
        <p className="text-sm text-gray-500 mb-4">The End Of The Line</p>

        <Link
          href={"https://www.linkedin.com/in/shree-bavachikar-a16493375/"}
          className="group block w-fit cursor-target"
        >
          <h2 className="text-[12vw] flex flex-col md:text-[5vw] gap-1 leading-[0.8] tracking-[-0.06em]">
            <span className="cursor-target mb-2">SHREE</span>
            <span>
              MADE THAT
              <span className="cursor-target inline-block ml-2 transition-transform duration-500 group-hover:animate-spin">
                🧿
              </span>
            </span>
          </h2>
        </Link>
      </div>

      {/* LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
        <div>
          <p className="text-xs text-gray-500 mb-4">NAVIGATION</p>

          <div className="flex flex-col gap-1">
            {navs.map((nav) => (
              <Link key={nav} href={`/${nav}`} className="cursor-target capitalize text-lg hover:text-gray-400 transition-colors">
                {nav}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-4">SOCIALS</p>

          <div className="flex flex-col gap-1">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target capitalize text-lg hover:text-gray-400 transition-colors"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 md:text-right">
          <p className="text-xs text-gray-500 mb-4">MASC</p>
          <p className="text-xs">something</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
