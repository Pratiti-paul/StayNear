import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ShieldCheck,
  ShieldAlert,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Users,
  Home,
  Clock,
} from "lucide-react";
import {
  getProperties,
  verifyProperty,
  featureProperty,
  deleteProperty,
} from "../services/propertyService";

function Admin() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      // Fetch all properties (passing no parameters or specific query params)
      const res = await getProperties({});
      setProperties(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admin data. Ensure you are signed in as an Admin.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await verifyProperty(id, true);
      alert("Property verified successfully.");
      fetchAdminData();
    } catch (err) {
      alert("Failed to verify property.");
    }
  };

  const handleReject = async (id) => {
    try {
      await verifyProperty(id, false);
      alert("Property unverified / rejected successfully.");
      fetchAdminData();
    } catch (err) {
      alert("Failed to reject property.");
    }
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      await featureProperty(id, !currentFeatured);
      alert(`Property ${!currentFeatured ? "marked as Featured" : "unfeatured"}.`);
      fetchAdminData();
    } catch (err) {
      alert("Failed to toggle featured status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this listing?")) return;
    try {
      await deleteProperty(id);
      alert("Property permanently deleted.");
      fetchAdminData();
    } catch (err) {
      alert("Failed to delete property.");
    }
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

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-10">
            <p className="uppercase tracking-[0.25em] text-sm font-semibold text-teal-700">
              Administration Area
            </p>
            <h1 className="mt-3 text-5xl font-extrabold text-slate-900">
              Admin Moderation
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Moderate listings, approve verified property applications, and highlight featured properties.
            </p>
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
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Home size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">TOTAL PROPERTIES</p>
                    <p className="text-3xl font-extrabold text-slate-800 mt-1">
                      {properties.length}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <CheckCircle size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">ACTIVE & VERIFIED</p>
                    <p className="text-3xl font-extrabold text-slate-800 mt-1">
                      {properties.filter((p) => p.verified).length}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex items-center gap-5">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                    <Clock size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-400">PENDING APPROVALS</p>
                    <p className="text-3xl font-extrabold text-slate-800 mt-1">
                      {properties.filter((p) => !p.verified).length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Properties Moderation Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900">Manage Listings</h2>
                </div>

                {properties.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                          <th className="px-8 py-5">Property Details</th>
                          <th className="px-6 py-5">Owner</th>
                          <th className="px-6 py-5">City</th>
                          <th className="px-6 py-5">Status</th>
                          <th className="px-6 py-5">Featured</th>
                          <th className="px-8 py-5 text-right">Moderation Actions</th>
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
                            <td className="px-6 py-5">
                              <p className="font-semibold text-slate-700">
                                {prop.owner ? prop.owner.name : "Unknown Owner"}
                              </p>
                              <p className="text-xs text-slate-400">
                                {prop.owner ? prop.owner.email : ""}
                              </p>
                            </td>
                            <td className="px-6 py-5 font-semibold text-slate-600">
                              {prop.city || "N/A"}
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
                            <td className="px-6 py-5">
                              <button
                                onClick={() => handleToggleFeatured(prop._id, prop.featured)}
                                className={`p-2 rounded-full transition cursor-pointer ${
                                  prop.featured
                                    ? "text-yellow-500 hover:bg-yellow-50"
                                    : "text-slate-300 hover:bg-slate-100"
                                }`}
                                title={prop.featured ? "Unfeature" : "Feature"}
                              >
                                <Star size={20} className={prop.featured ? "fill-yellow-500" : ""} />
                              </button>
                            </td>
                            <td className="px-8 py-5 text-right space-x-2 whitespace-nowrap">
                              {prop.verified ? (
                                <button
                                  onClick={() => handleReject(prop._id)}
                                  className="bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer"
                                >
                                  Reject
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleApprove(prop._id)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow shadow-emerald-600/10 cursor-pointer"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(prop._id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-lg transition inline-flex items-center justify-center cursor-pointer"
                                title="Delete Listing"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-20 text-center text-slate-500 font-medium">
                    No listed properties on StayNear yet.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Admin;