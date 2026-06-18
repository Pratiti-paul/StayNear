import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked(!liked);

    // Wishlist functionality will be added later
  };

  return (
    <div className="group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}

      <div className="relative overflow-hidden">

        <img
          src={property.image}
          alt={property.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Badges */}

        <div className="absolute left-4 top-4 flex gap-2">

          {property.verified && (
            <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
              Verified
            </span>
          )}

          {property.popular && (
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Popular
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
              liked
                ? "fill-red-500 text-red-500"
                : "text-slate-500"
            }`}
          />
        </button>

      </div>

      {/* Content */}

      <div className="p-6">

        {/* Type */}

        <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          {property.type}
        </span>

        {/* Name */}

        <h3 className="mt-4 text-2xl font-bold text-slate-900">
          {property.name}
        </h3>

        {/* Location */}

        <div className="mt-3 flex items-center gap-2 text-slate-600">

          <MapPin size={17} />

          <span>{property.location}</span>

        </div>

        {/* Rating */}

        <div className="mt-4 flex items-center gap-2">

          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold text-slate-900">
            {property.rating}
          </span>

          <span className="text-slate-500">
            ({property.reviews} Reviews)
          </span>

        </div>

        {/* Price */}

        <div className="mt-6 flex items-end justify-between">

          <div>

            <h2 className="text-3xl font-bold text-teal-700">
              ₹{property.price}
            </h2>

            <p className="text-sm text-slate-500">
              per month
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">

            <ShieldCheck size={16} />

            Verified

          </div>

        </div>

        {/* Amenities */}

        <div className="mt-6 flex flex-wrap gap-2">

          {property.amenities.slice(0, 3).map((amenity) => (
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
          to={`/property/${property.id}`}
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