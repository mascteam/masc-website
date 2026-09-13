import HeroBackGround from "./hero/HeroBackGround";
import HeroMainContent from "./hero/HeroMainContent";
import HeroToast from "./hero/HeroToast";
import HeroNotification from "./hero/HeroNotification";
import { Cover } from "../ui/cover";

const HeroSection = () => {
  return (
    <>
      <Cover>
        <section className="overflow-hidden relative flex h-screen w-screen flex-col items-center justify-center">
          <HeroMainContent />
        </section>
      </Cover>
      <div className="absolute z-10 bottom-0 p-2 mb-10 md:mb-0 md:p-10 left-0 h-1/2 w-full flex justify-between items-end">
        <HeroToast />
        <HeroNotification />
      </div>
    </>
  );
};

export default HeroSection;
