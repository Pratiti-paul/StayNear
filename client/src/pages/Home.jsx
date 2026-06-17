import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBanner from "../assets/hero_banner.png";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />

      <main className="flex-1">
        <img src={heroBanner} alt="Hero Banner" className="w-full object-cover" />
      </main>

      <Footer />

    </div>
  );
}

export default Home;