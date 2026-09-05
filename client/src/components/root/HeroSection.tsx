import HeroBackGround from "./hero/HeroBackGround";
import HeroMainContent from "./hero/HeroMainContent";
import HeroToast from "./hero/HeroToast";
import HeroNotification from "./hero/HeroNotification";

const HeroSection = () => {
  return (
    <section className="overflow-hidden relative flex h-screen w-screen flex-col items-center justify-center">
      <HeroBackGround />
      <HeroMainContent />
      <div className="absolute bottom-0 p-2 mb-10 md:mb-0 md:p-10 left-0 h-1/2 w-full flex justify-between items-end">
        <HeroToast />
        <HeroNotification />
      </div>
    </section>
  );
};

export default HeroSection;
