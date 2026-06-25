import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties, getWishlist } from "../services/propertyService";
import PropertyCard from "./PropertyCard";
import PropertyDetailsModal from "./PropertyDetailsModal";

function RecommendedSection() {
  const [properties, setProperties] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch properties
        const propRes = await getProperties({ featured: "true" });
        let props = propRes.data.data;

        // If no featured properties, load general properties
        if (props.length === 0) {
          const generalRes = await getProperties();
          props = generalRes.data.data;
        }
        setProperties(props.slice(0, 3));

        // Fetch wishlist if logged in
        if (localStorage.getItem("token")) {
          const wishlistRes = await getWishlist();
          setWishlistIds(wishlistRes.data.data.map((item) => item.property?._id));
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load recommended properties.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading recommendations...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-24 text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <p className="text-teal-700 font-semibold uppercase tracking-[0.25em] text-sm">
              Featured Properties
            </p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Recommended For You
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-8">
              Handpicked verified accommodations near popular universities,
              chosen for their comfort, affordability and student-friendly
              amenities.
            </p>
          </div>

          {/* Explore */}
          <Link
            to="/explore"
            className="mt-6 md:mt-0 text-teal-700 font-semibold hover:text-teal-800 transition"
          >
            Explore All Properties →
          </Link>
        </div>

        {/* Cards */}
        {properties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                isWishlisted={wishlistIds.includes(property._id)}
                onViewDetails={(prop) => {
                  setSelectedProperty(prop);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-10">
            No recommended properties found.
          </div>
        )}
      </div>

      {showModal && selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isWishlistedInitially={wishlistIds.includes(selectedProperty._id)}
          onClose={() => {
            setShowModal(false);
            setSelectedProperty(null);
          }}
          onWishlistToggle={(id, isLiked) => {
            setWishlistIds((prev) =>
              isLiked ? [...prev, id] : prev.filter((wId) => wId !== id)
            );
          }}
        />
      )}
    </section>
  );
}

export default RecommendedSection;