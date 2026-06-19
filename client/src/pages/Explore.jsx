import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";
import { getProperties, getWishlist } from "../services/propertyService";

function Explore() {
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters State
  const [propertyType, setPropertyType] = useState("");
  const [gender, setGender] = useState("");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [sort, setSort] = useState("newest");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (propertyType) params.propertyType = propertyType;
      if (gender) params.gender = gender;
      if (sort) params.sort = sort;

      const res = await getProperties(params);
      
      // Client-side filter for maxPrice limit
      const filtered = res.data.data.filter(
        (prop) => prop.price <= maxPrice
      );

      setProperties(filtered);

      // Fetch wishlist if user is authenticated
      if (localStorage.getItem("token")) {
        const wishlistRes = await getWishlist();
        setWishlistIds(wishlistRes.data.data.map((item) => item.property?._id));
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load properties.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, propertyType, gender, maxPrice, sort]);

  const handleClearAll = () => {
    setPropertyType("");
    setGender("");
    setMaxPrice(25000);
    setSearch("");
  };

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
              Browse verified PGs, hostels and shared accommodations near universities across India.
            </p>
          </div>

          {/* Search */}
          <SearchBar search={search} setSearch={setSearch} />

          {/* Main Layout */}
          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-12">
            {/* Sidebar */}
            <FilterSidebar
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              gender={gender}
              setGender={setGender}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onClear={handleClearAll}
            />

            {/* Right Side */}
            <div>
              {/* Top Bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {loading ? "Loading..." : `Showing ${properties.length} Verified Properties`}
                </h2>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="mt-4 md:mt-0 rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Cards */}
              {loading ? (
                <div className="py-20 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
                  <p className="mt-4 text-slate-500 font-medium">Loading properties...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 rounded-3xl p-10 text-center border border-red-200">
                  {error}
                </div>
              ) : properties.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      isWishlisted={wishlistIds.includes(property._id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-20 shadow border border-slate-100 text-center">
                  <h2 className="text-3xl font-bold text-slate-900">
                    No Properties Found
                  </h2>
                  <p className="mt-3 text-slate-600">
                    Try searching with another keyword or clearing filters.
                  </p>
                  <button
                    onClick={handleClearAll}
                    className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Reset Filters
                  </button>
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