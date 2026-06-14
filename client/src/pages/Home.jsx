import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <Navbar />

      <main className="flex-1">
        {/* Hero Section Here */}
      </main>

      <Footer />

    </div>
  );
}

export default Home;