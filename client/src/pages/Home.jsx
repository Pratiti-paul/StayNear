import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FeaturesSection from "../components/FeaturesSection";
import CategoriesSection from "../components/CategoriesSection";
import RecommendedSection from "../components/RecommendedSection";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />
      <Hero />
      <FeaturesSection />
      <CategoriesSection />
      <RecommendedSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />

    </div>
  );
}

export default Home;