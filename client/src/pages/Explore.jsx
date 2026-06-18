import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import properties from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Explore() {
  const [search, setSearch] = useState("");

  const filteredProperties = properties.filter((property) => {
    const query = search.toLowerCase();

    return (
      property.name.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="mb-12">
            <p className="uppercase tracking-[0.3em] text-sm font-semibold text-teal-700">
              Explore
            </p>

            <h1 className="mt-3 text-5xl font-bold text-slate-900">
              Find Your Perfect Stay
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Browse verified PGs, hostels and shared flats near top
              universities across India.
            </p>
          </div>

          {/* Search */}

          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col lg:flex-row gap-4 mb-14">

            <div className="flex items-center flex-1 gap-3">
              <Search
                size={22}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by property, location or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-lg"
              />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100 transition">
              <SlidersHorizontal size={20} />
              Filters
            </button>

          </div>

          {/* Results */}

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredProperties.length} Properties Found
            </h2>
          </div>

          {/* Cards */}

          {filteredProperties.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-slate-900">
                No Properties Found
              </h3>

              <p className="mt-3 text-slate-600">
                Try searching with a different keyword.
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Explore;