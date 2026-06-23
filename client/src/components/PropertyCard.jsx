import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { addToWishlist, removeFromWishlist } from "../services/propertyService";

function PropertyCard({ property, isWishlisted, onWishlistRemoved }) {
  const [liked, setLiked] = useState(isWishlisted || false);

  useEffect(() => {
    setLiked(isWishlisted || false);
  }, [isWishlisted]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (liked) {
        await removeFromWishlist(property._id);
        setLiked(false);
        if (onWishlistRemoved) onWishlistRemoved(property._id);
      } else {
        await addToWishlist(property._id);
        setLiked(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Please login to manage wishlist");
    }
  };

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      return img.startsWith("http") ? img : `http://localhost:5002${img}`;
    }
    return "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"; // unsplash fallback room
  };

  return (
    <div className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl(property.images)}
          alt={property.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {property.verified && (
            <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white animate-pulse">
              Verified
            </span>
          )}
          {property.featured && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${
              liked ? "fill-red-500 text-red-500" : "text-slate-500"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Type */}
        <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          {property.propertyType}
        </span>

        {/* Name */}
        <h3 className="mt-4 text-2xl font-bold text-slate-900 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="mt-3">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={17} className="shrink-0" />
            <span className="line-clamp-1">
              {property.location}
            </span>
          </div>

          <p className="ml-6 mt-1 text-sm text-slate-500">
            {[property.city, property.state]
              .filter(Boolean)
              .join(", ")}
            {property.nearbyCollege &&
              ` • Near ${property.nearbyCollege}`}
          </p>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-teal-700">₹{property.price}</h2>
            <p className="text-sm text-slate-500">per month</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
            <ShieldCheck size={16} />
            {property.verified ? "Verified" : "Pending Verification"}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-6 flex flex-wrap gap-2">
          {property.amenities &&
            property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700"
              >
                {amenity}
              </span>
            ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-200"></div>

        {/* Bottom */}
        <Link
          to={`/property/${property._id}`}
          className="flex items-center justify-between font-semibold text-teal-700 transition hover:text-teal-800"
        >
          <span>View Details</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;