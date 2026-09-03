import Link from "next/link";

const navs: {
  name: string;
  path: string;
}[] = [
  { name: "Home", path: "/" },
  { name: "Teams", path: "/teams" },
  { name: "Events", path: "/events" },
  { name: "Blogs", path: "/blogs" },
  { name: "Register", path: "/register" },
];

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
          <h2 className="text-[10vw] flex flex-col md:text-[5vw] gap-1 leading-[0.8] tracking-[-0.06em]">
            <span className="cursor-target mb-2">SHREE</span>
            <span>
              MADE THAT

            </span>
          </h2>
        </Link>
      </div>

      {/* LINKS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:py-16">
        <div>
          <p className="text-xs text-gray-500 mb-4">NAVIGATION</p>

          <div className="flex flex-col gap-1">
            {navs.map((nav) => (
              <Link key={`${nav.name} footer`} href={`${nav.path}`} className="cursor-target capitalize text-lg hover:text-gray-400 transition-colors">
                {nav.name}
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

        <div className="md:col-span-2 md:text-right flex flex-col justify-start md:items-end items-start mb-2 md:mb-0">
          <p className="text-xs text-gray-500 mb-4">MASC</p>
          <p title="Albert Camus" className="text-xs w-[90vw] overflow-x-hidden md:max-w-55 cursor-target">The universe is under no obligation to make sense to you.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
