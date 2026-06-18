import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBanner from "../assets/hero_banner.png";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />

      <main className="flex-1">
        <img src={heroBanner} alt="Hero Banner" className="w-full object-cover" />
      </main>
      <StatsSection />
      <TestimonialsSection />
      <Footer />

    </div>
  );
}

export default Home;