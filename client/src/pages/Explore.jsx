import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";
import properties from "../data/properties";

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

      <main className="bg-slate-50 min-h-screen pt-28 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}

          <div className="mb-10">

            <p className="uppercase tracking-[0.25em] text-sm font-semibold text-teal-700">
              Explore
            </p>

            <h1 className="mt-3 text-5xl font-bold text-slate-900">
              Find Your Perfect Stay
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Browse verified PGs, hostels and shared accommodations
              near universities across India.
            </p>

          </div>

          {/* Search */}

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {/* Main Layout */}

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-12">

            {/* Sidebar */}

            <FilterSidebar />

            {/* Right Side */}

            <div>

              {/* Top Bar */}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                <h2 className="text-2xl font-bold text-slate-900">
                  Showing {filteredProperties.length} Verified Properties
                </h2>

                <select className="mt-4 md:mt-0 rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none">

                  <option>Most Recommended</option>

                  <option>Price: Low to High</option>

                  <option>Price: High to Low</option>

                  <option>Highest Rated</option>

                  <option>Newest</option>

                </select>

              </div>

              {/* Cards */}

              {filteredProperties.length > 0 ? (

                <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">

                  {filteredProperties.map((property) => (

                    <PropertyCard
                      key={property.id}
                      property={property}
                    />

                  ))}

                </div>

              ) : (

                <div className="bg-white rounded-3xl p-20 shadow text-center">

                  <h2 className="text-3xl font-bold text-slate-900">
                    No Properties Found
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Try searching with another keyword.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Explore;