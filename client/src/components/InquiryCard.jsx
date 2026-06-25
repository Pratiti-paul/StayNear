import { Calendar, MapPin, Check, ChevronRight } from "lucide-react";

function InquiryCard({ inquiry, onViewDetails }) {
  const { property, status, moveInDate, createdAt } = inquiry;

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      return img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL.replace("/api", "")}${img}`;
    }
    return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-amber-100 text-amber-855 border-amber-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
      {/* Property Image & Status Badges */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <img
          src={getImageUrl(property?.images)}
          alt={property?.title || "Property"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status Badge */}
        <span
          className={`absolute left-4 top-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide border shadow-sm ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
        {/* Inquiry Created Date Badge */}
        <div className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
          <Calendar size={14} className="text-slate-500" />
          <span className="text-xs font-semibold text-slate-700">
            {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-teal-700 transition duration-300">
          {property?.title || "Untitled Property"}
        </h3>

        {/* Location Details */}
        <div className="mt-3 flex items-start gap-1.5 text-slate-500">
          <MapPin size={16} className="shrink-0 text-slate-400 mt-0.5" />
          <div className="text-sm font-medium">
            <p className="line-clamp-1">{property?.location}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {[property?.city, property?.state].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-black text-teal-700">
            ₹{property?.price}
          </span>
          <span className="text-xs font-bold text-slate-400">/ month</span>
        </div>

        {/* Badges Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {property?.propertyType && (
            <span className="rounded-full bg-slate-100 border border-slate-200/50 px-3 py-1 text-xs font-bold text-slate-600">
              {property.propertyType}
            </span>
          )}
          {property?.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <Check size={12} strokeWidth={3} />
              Verified
            </span>
          )}
        </div>

        {/* Move-in Date Text */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-600 font-semibold">
          <Calendar size={16} className="text-teal-600" />
          <span>Move In: {formatDate(moveInDate)}</span>
        </div>

        {/* Button Spacer */}
        <div className="mt-6 flex-grow flex items-end">
          <button
            onClick={() => onViewDetails(inquiry)}
            className="w-full flex items-center justify-between border border-slate-200 rounded-2xl py-3.5 px-5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-300 cursor-pointer"
          >
            <span>View Details</span>
            <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InquiryCard;
