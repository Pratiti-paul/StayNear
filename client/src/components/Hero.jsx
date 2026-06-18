import HeroContent from "./HeroContent";
import heroImage from "../assets/hero-room.png";

function Hero() {
  return (
    <section 
      className="relative w-full min-h-[550px] lg:h-[650px] bg-cover bg-no-repeat bg-[position:75%_top] md:bg-[position:70%_top] lg:bg-[position:30%_top] flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Mobile overlay for readability */}
      <div className="absolute inset-0 bg-white/30 md:bg-transparent z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-0 relative z-10">
        <div className="max-w-[480px]">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}

export default Hero;