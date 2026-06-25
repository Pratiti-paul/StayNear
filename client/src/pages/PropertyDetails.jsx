import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  Phone,
  Calendar,
  Wifi,
  Car,
  Utensils,
  WashingMachine,
  ShieldAlert,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  getPropertyById,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  createInquiry,
} from "../services/propertyService";
import { toast } from "sonner";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  // Inquiry Modal State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [inquirySubmitting, setInquirySubmitting] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const res = await getPropertyById(id);
        setProperty(res.data.data);

        // Check if wishlisted
        if (localStorage.getItem("token")) {
          const wishRes = await getWishlist();
          const isLiked = wishRes.data.data.some(
            (item) => item.property?._id === id
          );
          setIsWishlisted(isLiked);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Property not found or server error.");
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, [id]);

  const handleToggleWishlist = async () => {
    if (!localStorage.getItem("token")) {
      toast.warning("Please login to add this property to your wishlist");
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(property._id);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(property._id);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      toast.warning("Please login to submit an inquiry");
      return;
    }
    try {
      setInquirySubmitting(true);
      await createInquiry({
        propertyId: property._id,
        moveInDate: inquiryDate,
        message: inquiryMsg,
      });
      toast.success("Inquiry sent successfully to owner!");
      setShowInquiryModal(false);
      setInquiryDate("");
      setInquiryMsg("");
      setInquirySubmitting(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit inquiry");
      setInquirySubmitting(false);
    }
  };

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      return img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL.replace("/api", "")}${img}`;
    }
    return "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-10">
          <ShieldAlert size={60} className="text-red-500 mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Property Not Found</h1>
          <p className="text-slate-600 mb-6">The listing you are trying to view is unavailable or deleted.</p>
          <button
            onClick={() => navigate("/explore")}
            className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Back to Explore
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 font-semibold text-slate-600 hover:text-teal-700 transition"
          >
            <ArrowLeft size={18} /> Back to Listings
          </button>

          {/* Image Gallery */}
          <div className="relative group overflow-hidden rounded-3xl shadow-lg h-[500px]">
            <img
              src={getImageUrl(property.images)}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            {property.featured && (
              <span className="absolute left-6 top-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow">
                Featured
              </span>
            )}
          </div>

          {/* Main Grid */}
          <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Left Side */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                      {property.title}
                    </h1>
                    {property.verified && (
                      <ShieldCheck size={28} className="text-teal-600 shrink-0" />
                    )}
                  </div>

                  <span className="inline-block mt-3 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-100">
                    {property.propertyType} • {property.gender}
                  </span>

                  <div className="flex items-center gap-2 mt-5 text-slate-600 font-medium">
                    <MapPin size={18} className="text-teal-600" />
                    <span>
                      {property.location}, {property.city}, {property.state} - {property.pincode}
                    </span>
                  </div>

                  <div className="mt-2 text-slate-500 font-medium text-sm pl-7">
                    <span>
                      {property.distanceFromCollege} from {property.nearbyCollege}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-5 pl-1">
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-800">
                      {property.rating ? property.rating.toFixed(1) : "0.0"}
                    </span>
                    <span className="text-slate-500">
                      ({property.reviewCount || 0} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900">Description</h2>
                <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {/* Details & Specs */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900">Key Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-400 font-semibold">ROOM TYPE</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{property.roomType}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-400 font-semibold">SECURITY DEPOSIT</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">₹{property.securityDeposit}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm text-slate-400 font-semibold">AVAILABLE BEDS</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{property.availableBeds}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-12 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Included Amenities</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.amenities.map((item) => (
                    <div
                      key={item}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:border-teal-300 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                        {item.toLowerCase().includes("wifi") ? (
                          <Wifi size={20} />
                        ) : item.toLowerCase().includes("laundry") ||
                          item.toLowerCase().includes("washing") ? (
                          <WashingMachine size={20} />
                        ) : item.toLowerCase().includes("meals") ||
                          item.toLowerCase().includes("mess") ||
                          item.toLowerCase().includes("food") ? (
                          <Utensils size={20} />
                        ) : (
                          <Car size={20} />
                        )}
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side (Booking Box) */}
            <div className="h-fit">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 sticky top-28">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-teal-700">₹{property.price}</span>
                  <span className="text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-slate-400 text-xs font-semibold mt-2">
                  + ₹{property.securityDeposit} security deposit (refundable)
                </p>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-4 font-bold flex justify-center items-center gap-2 shadow-lg shadow-teal-600/10 cursor-pointer"
                  >
                    <Calendar size={20} />
                    Book Visit
                  </button>

                  <button
                    onClick={() => setShowContact(!showContact)}
                    className="w-full border-2 border-teal-600 text-teal-700 rounded-xl py-4 font-bold flex justify-center items-center gap-2 hover:bg-teal-600 hover:text-white transition cursor-pointer"
                  >
                    <Phone size={20} />
                    {showContact ? "Hide Contact" : "Contact Owner"}
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    className={`w-full border rounded-xl py-4 font-bold flex justify-center items-center gap-2 transition cursor-pointer ${
                      isWishlisted
                        ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-600" : ""} />
                    {isWishlisted ? "Remove Wishlist" : "Add to Wishlist"}
                  </button>
                </div>

                {/* Contact Drawer */}
                {showContact && property.owner && (
                  <div className="mt-6 border-t border-slate-100 pt-6 animate-fadeIn">
                    <p className="text-sm font-bold text-slate-400 mb-3">OWNER DETAILS</p>
                    <p className="font-bold text-slate-800 text-lg">{property.owner.name}</p>
                    <p className="text-slate-600 text-sm mt-2 font-medium">
                      Email: {property.owner.email}
                    </p>
                    <p className="text-slate-600 text-sm mt-1 font-medium">
                      Phone: {property.owner.phone || "Not Provided"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry / Booking Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-scaleIn">
            <button
              onClick={() => setShowInquiryModal(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                  className="staynear-input"
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
                  className="staynear-input py-3"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className="w-full staynear-button-primary mt-4 disabled:opacity-50"
              >
                {inquirySubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default PropertyDetails;