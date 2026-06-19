import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Plus,
  Home,
  MessageSquare,
  Trash2,
  Edit,
  Eye,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Upload,
} from "lucide-react";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getInquiries,
  updateInquiryStatus,
} from "../services/propertyService";

function Owner() {
  const [view, setView] = useState("dashboard"); // dashboard, create, edit
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "Girls PG",
    gender: "Girls",
    price: "",
    securityDeposit: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    nearbyCollege: "",
    distanceFromCollege: "",
    roomType: "Single",
    availableBeds: "1",
    amenities: "",
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch owner's properties
      const propRes = await getProperties({ owner: "true" });
      setProperties(propRes.data.data);

      // Fetch inquiries
      const inqRes = await getInquiries();
      setInquiries(inqRes.data.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data. Ensure you are signed in as an Owner.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      for (let i = 0; i < files.length; i++) {
        data.append("images", files[i]);
      }

      if (view === "create") {
        await createProperty(data);
        alert("Property listed successfully!");
      } else if (view === "edit" && selectedProperty) {
        await updateProperty(selectedProperty._id, data);
        alert("Property updated successfully!");
      }

      // Reset Form and View
      handleBackToDashboard();
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Operation failed");
      setSubmitting(false);
    }
  };

  const handleEditClick = (prop) => {
    setSelectedProperty(prop);
    setFormData({
      title: prop.title,
      description: prop.description,
      propertyType: prop.propertyType || "Girls PG",
      gender: prop.gender || "Girls",
      price: prop.price,
      securityDeposit: prop.securityDeposit,
      location: prop.location,
      city: prop.city,
      state: prop.state,
      pincode: prop.pincode,
      nearbyCollege: prop.nearbyCollege,
      distanceFromCollege: prop.distanceFromCollege,
      roomType: prop.roomType || "Single",
      availableBeds: prop.availableBeds,
      amenities: prop.amenities ? prop.amenities.join(", ") : "",
    });
    setFiles([]);
    setView("edit");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteProperty(id);
      alert("Property deleted.");
      fetchDashboardData();
    } catch (err) {
      alert("Failed to delete property.");
    }
  };

  const handleInquiryStatusChange = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      alert(`Inquiry status updated to ${status}`);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to update inquiry status.");
    }
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedProperty(null);
    setFormData({
      title: "",
      description: "",
      propertyType: "Girls PG",
      gender: "Girls",
      price: "",
      securityDeposit: "",
      location: "",
      city: "",
      state: "",
      pincode: "",
      nearbyCollege: "",
      distanceFromCollege: "",
      roomType: "Single",
      availableBeds: "1",
      amenities: "",
    });
    setFiles([]);
    setSubmitting(false);
  };

  if (loading && view === "dashboard") {
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

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {view === "dashboard" ? (
            <>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                <div>
                  <p className="uppercase tracking-[0.25em] text-sm font-semibold text-teal-700">
                    Owner Area
                  </p>
                  <h1 className="mt-3 text-5xl font-extrabold text-slate-900">
                    Owner Dashboard
                  </h1>
                </div>

                <button
                  onClick={() => setView("create")}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg shadow-teal-600/10 cursor-pointer"
                >
                  <Plus size={20} /> Add New Property
                </button>
              </div>

              {error ? (
                <div className="bg-red-50 text-red-700 rounded-3xl p-10 text-center border border-red-200">
                  {error}
                </div>
              ) : (
                <>
                  {/* Stats Cards */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                        <Home size={26} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400">MY LISTINGS</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-1">
                          {properties.length}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                      <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600">
                        <MessageSquare size={26} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400">TOTAL INQUIRIES</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-1">
                          {inquiries.length}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <ShieldCheck size={26} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400">VERIFIED LISTINGS</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-1">
                          {properties.filter((p) => p.verified).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Listings Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <div className="p-8 border-b border-slate-100">
                      <h2 className="text-2xl font-bold text-slate-900">My Listings</h2>
                    </div>

                    {properties.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                              <th className="px-8 py-5">Property</th>
                              <th className="px-6 py-5">Type</th>
                              <th className="px-6 py-5">Monthly Rent</th>
                              <th className="px-6 py-5">Status</th>
                              <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {properties.map((prop) => (
                              <tr key={prop._id} className="hover:bg-slate-50 transition">
                                <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                    <img
                                      src={
                                        prop.images && prop.images.length > 0
                                          ? `http://localhost:5002${prop.images[0]}`
                                          : "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=80&q=80"
                                      }
                                      alt={prop.title}
                                      className="w-12 h-12 rounded-xl object-cover"
                                    />
                                    <div>
                                      <p className="font-bold text-slate-800 line-clamp-1">
                                        {prop.title}
                                      </p>
                                      <p className="text-xs text-slate-400 font-medium">
                                        {prop.location}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-5 font-semibold text-slate-600">
                                  {prop.propertyType}
                                </td>
                                <td className="px-6 py-5 font-extrabold text-teal-700">
                                  ₹{prop.price}
                                </td>
                                <td className="px-6 py-5">
                                  {prop.verified ? (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                                      <ShieldCheck size={14} /> Verified
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-100">
                                      <ShieldAlert size={14} /> Pending
                                    </span>
                                  )}
                                </td>
                                <td className="px-8 py-5 text-right space-x-3 whitespace-nowrap">
                                  <button
                                    onClick={() => handleEditClick(prop)}
                                    className="p-2 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition"
                                    title="Edit"
                                  >
                                    <Edit size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(prop._id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                                    title="Delete"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-20 text-center text-slate-500 font-medium">
                        You have not listed any properties yet.
                      </div>
                    )}
                  </div>

                  {/* Inquiries Section */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-100">
                      <h2 className="text-2xl font-bold text-slate-900">Recent Inquiries</h2>
                    </div>

                    {inquiries.length > 0 ? (
                      <div className="divide-y divide-slate-100">
                        {inquiries.map((inq) => (
                          <div
                            key={inq._id}
                            className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-800 text-lg">
                                  {inq.tenant ? inq.tenant.name : "Guest Seeker"}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {inq.tenant ? inq.tenant.email : ""}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-slate-500">
                                Property: {inq.property ? inq.property.title : "Deleted Property"}
                              </p>
                              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl bg-slate-50 p-4 rounded-xl border border-slate-100">
                                "{inq.message}"
                              </p>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                Target Move-in:{" "}
                                {new Date(inq.moveInDate).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                              {inq.status === "pending" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleInquiryStatusChange(inq._id, "accepted")
                                    }
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-sm transition shadow shadow-emerald-600/10 cursor-pointer"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleInquiryStatusChange(inq._id, "rejected")
                                    }
                                    className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2.5 rounded-lg text-sm transition cursor-pointer"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <span
                                  className={`px-4 py-2 rounded-lg text-sm font-bold border uppercase tracking-wider ${
                                    inq.status === "accepted"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                      : "bg-red-50 text-red-700 border-red-100"
                                  }`}
                                >
                                  {inq.status}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-20 text-center text-slate-500 font-medium">
                        No inquiries received yet.
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            // Create / Edit View
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleBackToDashboard}
                className="mb-8 flex items-center gap-2 font-semibold text-slate-600 hover:text-teal-700 transition cursor-pointer"
              >
                <ArrowLeft size={18} /> Back to Dashboard
              </button>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 md:p-12">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
                  {view === "create" ? "List Your Property" : "Edit Property Listings"}
                </h2>

                <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                  {/* Basic Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Green Nest Girls PG"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="staynear-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="staynear-select"
                      >
                        <option value="Girls PG">Girls PG</option>
                        <option value="Boys PG">Boys PG</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Shared Flat">Shared Flat</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe amenities, surroundings, timings, etc."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="staynear-input py-3"
                    ></textarea>
                  </div>

                  {/* Pricing */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Monthly Rent (₹)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 7500"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="staynear-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Security Deposit (₹)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 10000"
                        value={formData.securityDeposit}
                        onChange={(e) =>
                          setFormData({ ...formData, securityDeposit: e.target.value })
                        }
                        className="staynear-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Gender Suitability
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="staynear-select"
                      >
                        <option value="Girls">Girls</option>
                        <option value="Boys">Boys</option>
                        <option value="Co-ed">Co-ed</option>
                      </select>
                    </div>
                  </div>

                  {/* College specs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Nearby College / University
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Delhi University"
                        value={formData.nearbyCollege}
                        onChange={(e) =>
                          setFormData({ ...formData, nearbyCollege: e.target.value })
                        }
                        className="staynear-input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Distance from College
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 500m or 1.2 km"
                        value={formData.distanceFromCollege}
                        onChange={(e) =>
                          setFormData({ ...formData, distanceFromCollege: e.target.value })
                        }
                        className="staynear-input"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Address / Location
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sector 62, Noida"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="staynear-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Noida"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="staynear-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        required
                        placeholder="201301"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="staynear-input"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                      <input
                        type="text"
                        required
                        placeholder="Uttar Pradesh"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="staynear-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Room Type
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Single, 2 Sharing, Bunk Beds"
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        className="staynear-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Available Beds
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.availableBeds}
                        onChange={(e) =>
                          setFormData({ ...formData, availableBeds: e.target.value })
                        }
                        className="staynear-input"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Amenities (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. High-Speed WiFi, Meals Included, Laundry, Gym, AC"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      className="staynear-input"
                    />
                  </div>

                  {/* Images Upload */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Upload Property Images
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload size={28} className="text-slate-400 mb-2" />
                          <p className="mb-2 text-sm text-slate-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-400">PNG, JPG, JPEG, WEBP (Max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => setFiles(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {files.length > 0 && (
                      <p className="mt-2 text-sm text-teal-600 font-semibold pl-1">
                        {files.length} file(s) selected for upload.
                      </p>
                    )}
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-grow staynear-button-primary disabled:opacity-50"
                    >
                      {submitting
                        ? "Submitting..."
                        : view === "create"
                        ? "Submit Listing"
                        : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleBackToDashboard}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-4 rounded-xl font-bold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Owner;