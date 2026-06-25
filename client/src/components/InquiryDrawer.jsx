import { useEffect, useState } from "react";
import {
  X,
  Copy,
  ExternalLink,
  MessageSquare,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Check,
  Building2,
} from "lucide-react";

function InquiryDrawer({ inquiry, isOpen, onClose }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay animation activation slightly for transition effects
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen || !inquiry) return null;

  const { property, status, moveInDate, message, createdAt, _id } = inquiry;

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      return img.startsWith("http") ? img : `http://localhost:5002${img}`;
    }
    return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-emerald-100 text-emerald-800 border-emerald-250";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-250";
      default:
        return "bg-amber-100 text-amber-800 border-amber-250";
    }
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${datePart}, ${timePart}`;
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(_id);
    alert("Inquiry ID copied to clipboard!");
  };

  const getShortId = (id) => {
    if (!id) return "";
    return `Inquiry ID: ${id.substring(0, 8)}...${id.substring(id.length - 4)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 pointer-events-auto ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Container */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full md:max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out z-50 ${
          animate ? "translate-x-0" : "translate-x-full"
        } rounded-l-3xl md:rounded-l-3xl rounded-none`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Inquiry Details</h2>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
              <span>{getShortId(_id)}</span>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-slate-100 hover:text-slate-600 rounded transition cursor-pointer"
                title="Copy Inquiry ID"
              >
                <Copy size={12} />
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Badge Top Row */}
          <div>
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide border ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          {/* Property Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Property
            </h3>

            <div className="flex items-start gap-4">
              <img
                src={getImageUrl(property?.images)}
                alt={property?.title}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shrink-0"
              />

              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-base leading-snug line-clamp-1">
                  {property?.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                  {property?.location}, {property?.city}
                </p>

                <p className="text-teal-700 font-extrabold text-sm mt-1.5">
                  ₹{property?.price} <span className="text-slate-400 font-bold text-[10px]">/ month</span>
                </p>

                <div className="mt-2 flex items-center gap-1.5">
                  {property?.propertyType && (
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      {property.propertyType}
                    </span>
                  )}

                  {property?.verified && (
                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                      <Check size={8} strokeWidth={3} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Inquiry Information */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Inquiry Information
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar size={16} className="text-teal-600" />
                  <span>Move In Date</span>
                </div>

                <span className="font-semibold text-slate-800">
                  {formatFullDate(moveInDate)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Clock size={16} className="text-teal-600" />
                  <span>Sent On</span>
                </div>

                <span className="font-semibold text-slate-800">
                  {formatDateTime(createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Building2 size={16} className="text-teal-600" />
                  <span>Status</span>
                </div>

                <span
                  className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${getStatusColor(
                    status
                  )}`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Your Message */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Your Message
            </h3>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed font-medium">
              {message || "No message sent."}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Owner Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <User size={14} className="text-slate-450" />
              Owner Details
            </h3>

            <div className="border border-slate-200/60 rounded-2xl p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-xs uppercase">Name</span>
                <span className="font-bold text-slate-800">
                  {property?.owner?.name || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-xs uppercase">Email</span>
                <span className="font-bold text-slate-800 select-all">
                  {property?.owner?.email || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold text-xs uppercase">Phone</span>
                <span className="font-bold text-slate-800 select-all">
                  {property?.owner?.phone || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3 shrink-0">
          <div className="grid grid-cols-2 gap-3">
            {/* View Property */}
            <a
              href={`/property/${property?._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-slate-250 bg-white py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-350 transition cursor-pointer"
            >
              <span>View Property</span>
              <ExternalLink size={14} />
            </a>

            {/* Contact Owner Action */}
            <a
              href={property?.owner?.email ? `mailto:${property.owner.email}?subject=Inquiry for ${encodeURIComponent(property.title)}` : "#"}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-teal-600 py-3.5 text-sm font-bold text-white hover:bg-teal-700 hover:shadow-md transition cursor-pointer"
            >
              <Mail size={14} />
              <span>Contact Owner</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-200 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-300 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InquiryDrawer;
