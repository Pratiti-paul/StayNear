import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Phone,
  Heart,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import {
  addToWishlist,
  removeFromWishlist,
  createInquiry,
} from "../services/propertyService";

function PropertyDetailsModal({ property, onClose, isWishlistedInitially, onWishlistToggle }) {
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedInitially);
  const [showContact, setShowContact] = useState(false);
  
  // Inquiry form states
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  useEffect(() => {
    setIsWishlisted(isWishlistedInitially);
  }, [isWishlistedInitially]);

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("token")) {
      alert("Please login to add this property to your wishlist");
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(property._id);
        setIsWishlisted(false);
        if (onWishlistToggle) onWishlistToggle(property._id, false);
      } else {
        await addToWishlist(property._id);
        setIsWishlisted(true);
        if (onWishlistToggle) onWishlistToggle(property._id, true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      alert("Please login to submit an inquiry");
      return;
    }
    try {
      setInquirySubmitting(true);
      await createInquiry({
        propertyId: property._id,
        moveInDate: inquiryDate,
        message: inquiryMsg,
      });
      alert("Inquiry sent successfully to owner!");
      setShowInquiryModal(false);
      setInquiryDate("");
      setInquiryMsg("");
      setInquirySubmitting(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit inquiry");
      setInquirySubmitting(false);
    }
  };

  const getImageUrl = (img) => {
    if (!img) {
      return "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80";
    }
    return img.startsWith("http") ? img : `http://localhost:5002${img}`;
  };

  if (!property) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Title Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 pr-10 mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {property.title}
            </h2>
            {property.verified && (
              <ShieldCheck size={28} className="text-teal-600 shrink-0" />
            )}
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600">
            {/* Key Specs */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-base">Key Specs</h3>
              <div className="space-y-2.5">
                <p>
                  <span className="font-bold text-slate-700">Type:</span>{" "}
                  {property.propertyType}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Gender suitability:</span>{" "}
                  {property.gender}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Price (Rent):</span> ₹
                  {property.price} / month
                </p>
                <p>
                  <span className="font-bold text-slate-700">Security Deposit:</span> ₹
                  {property.securityDeposit}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Room Type:</span>{" "}
                  {property.roomType}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Available Beds:</span>{" "}
                  {property.availableBeds}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Verification Status:</span>{" "}
                  {property.verified ? "Approved" : "Pending"}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Featured Status:</span>{" "}
                  {property.featured ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Location & College Details */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3 text-base">Location & College Details</h3>
              <div className="space-y-2.5">
                <p>
                  <span className="font-bold text-slate-700">Address:</span>{" "}
                  {property.location}
                </p>
                <p>
                  <span className="font-bold text-slate-700">City:</span> {property.city}
                </p>
                <p>
                  <span className="font-bold text-slate-700">State:</span>{" "}
                  {property.state}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Pincode:</span>{" "}
                  {property.pincode}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Nearby College:</span>{" "}
                  {property.nearbyCollege}
                </p>
                <p>
                  <span className="font-bold text-slate-700">Distance from College:</span>{" "}
                  {property.distanceFromCollege}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-800 mb-2 text-base">Description</h3>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-800 mb-3 text-base">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities?.map((amenity, idx) => (
                <span
                  key={idx}
                  className="bg-teal-50 text-teal-700 font-semibold px-3.5 py-2 rounded-full text-xs border border-teal-100"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Owner Info Block */}
          {showContact && property.owner && (
            <div className="mt-8 border-t border-slate-100 pt-6 bg-slate-50 p-6 rounded-2xl border border-slate-150">
              <h3 className="font-bold text-slate-800 mb-3 text-base">Owner Information</h3>
              <div className="grid md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                <p>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    NAME
                  </span>{" "}
                  {property.owner.name}
                </p>
                <p>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    EMAIL
                  </span>{" "}
                  {property.owner.email}
                </p>
                <p>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    PHONE
                  </span>{" "}
                  {property.owner.phone || "Not Provided"}
                </p>
              </div>
            </div>
          )}

          {/* Property Gallery */}
          {property.images && property.images.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-4 text-base">Property Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`gallery-${idx}`}
                    className="w-full h-40 object-cover rounded-xl border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-800 mb-4 text-base">Actions</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-end gap-3">
              {/* Add to Wishlist */}
              <button
                onClick={handleToggleWishlist}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold border transition cursor-pointer ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-600" : ""} />
                {isWishlisted ? "Remove Wishlist" : "Add to Wishlist"}
              </button>

              {/* Contact Owner */}
              <button
                onClick={() => setShowContact(!showContact)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-teal-600 px-5 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-600 hover:text-white transition cursor-pointer"
              >
                <Phone size={18} />
                {showContact ? "Hide Contact" : "Contact Owner"}
              </button>

              {/* Book Visit */}
              <button
                onClick={() => setShowInquiryModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition cursor-pointer shadow-lg shadow-teal-600/10"
              >
                <Calendar size={18} />
                Book Visit
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry / Booking Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-650 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule a Visit</h2>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Move-in Date
                </label>
                <input
                  type="date"
                  required
                  value={inquiryDate}
                  onChange={(e) => setInquiryDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message for Owner
                </label>
                <textarea
                  required
                  rows={4}
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="Ask about availability, room tours, rules, etc."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm font-medium text-slate-800"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full inline-flex items-center justify-center rounded-2xl bg-teal-600 py-4 font-bold text-white hover:bg-teal-700 transition cursor-pointer disabled:opacity-50"
              >
                {inquirySubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyDetailsModal;
