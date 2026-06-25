import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import PropertyDetailsModal from "../components/PropertyDetailsModal";
import { getWishlist } from "../services/propertyService";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      setWishlistItems(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load wishlist. Please make sure you are logged in.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleWishlistRemoved = (propertyId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.property?._id !== propertyId)
    );
  };

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <p className="uppercase tracking-[0.25em] text-sm font-semibold text-teal-700">
              Personal Area
            </p>
            <h1 className="mt-3 text-5xl font-bold text-slate-900">
              My Wishlist
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Manage your saved accommodations and compare options.
            </p>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
              <p className="mt-4 text-slate-500 font-medium">Loading wishlist...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 rounded-3xl p-10 text-center border border-red-200">
              {error}
            </div>
          ) : wishlistItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item) => {
                if (!item.property) return null;
                return (
                  <PropertyCard
                    key={item._id}
                    property={item.property}
                    isWishlisted={true}
                    onWishlistRemoved={handleWishlistRemoved}
                    onViewDetails={(prop) => {
                      setSelectedProperty(prop);
                      setShowModal(true);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-20 shadow border border-slate-100 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Your Wishlist is Empty
              </h2>
              <p className="mt-3 text-slate-600">
                Browse properties and click the heart icon to save them here.
              </p>
            </div>
          )}
        </div>
      </main>

      {showModal && selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isWishlistedInitially={true}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
          onWishlistToggle={(id, isLiked) => {
            if (!isLiked) {
              handleWishlistRemoved(id);
            }
          }}
        />
      )}

      <Footer />
    </>
  );
}

export default Wishlist;