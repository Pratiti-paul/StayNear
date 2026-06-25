import { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardCards from "../components/admin/DashboardCards";
import QuickActions from "../components/admin/QuickActions";
import PendingProperties from "../components/admin/PendingProperties";
import RecentUsers from "../components/admin/RecentUsers";
import PropertyTable from "../components/admin/PropertyTable";
import UserTable from "../components/admin/UserTable";
import { Check, Trash2, X } from "lucide-react";
import {
  getAdminStats,
  getAdminUsers,
  getAdminProperties,
  verifyAdminProperty,
  deleteAdminProperty,
  deleteAdminUser,
  updateAdminUserRole,
} from "../services/propertyService";
import { toast } from "sonner";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const statsRes = await getAdminStats();
      setStats(statsRes.data.stats);

      const usersRes = await getAdminUsers();
      setUsers(usersRes.data.data);

      const propRes = await getAdminProperties();
      setProperties(propRes.data.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load administration data. Make sure you are logged in as Admin.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApproveProperty = async (id) => {
    try {
      await verifyAdminProperty(id, true);
      toast.success("Property approved successfully.");
      fetchDashboardData();
      return true;
    } catch (err) {
      toast.error("Failed to approve property.");
      return false;
    }
  };

  const handleRejectProperty = async (id) => {
    try {
      await verifyAdminProperty(id, false);
      toast.success("Property rejected successfully.");
      fetchDashboardData();
      return true;
    } catch (err) {
      toast.error("Failed to reject property.");
      return false;
    }
  };

  const handleDeleteProperty = (id) => {
    toast("Are you sure you want to permanently delete this property listing?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteAdminProperty(id);
            toast.success("Property deleted successfully.");
            fetchDashboardData();
            handleClosePropertyModal();
          } catch (err) {
            toast.error("Failed to delete property.");
          }
        }
      }
    });
  };

  const handleDeleteUser = (id) => {
    toast("Are you sure you want to permanently delete this user account?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteAdminUser(id);
            toast.success("User deleted successfully.");
            fetchDashboardData();
          } catch (err) {
            toast.error("Failed to delete user.");
          }
        }
      }
    });
  };

  const handleChangeUserRole = async (id, role) => {
    try {
      await updateAdminUserRole(id, role);
      toast.success(`User role updated to ${role} successfully.`);
      fetchDashboardData();
    } catch (err) {
      toast.error("Failed to update user role.");
    }
  };

  const handleViewProperty = (prop) => {
    setSelectedProperty(prop);
    setShowModal(true);
  };

  const handleClosePropertyModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleModalApprove = async () => {
    const success = await handleApproveProperty(selectedProperty._id);
    if (success) {
      handleClosePropertyModal();
    }
  };

  const handleModalReject = async () => {
    const success = await handleRejectProperty(selectedProperty._id);
    if (success) {
      handleClosePropertyModal();
    }
  };

  const handleModalDelete = () => {
    handleDeleteProperty(selectedProperty._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-700"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-grow p-8 max-w-[calc(100vw-256px)] overflow-x-hidden">
          {error ? (
            <div className="bg-red-50 text-red-700 rounded-3xl p-10 text-center border border-red-200 max-w-4xl mx-auto">
              {error}
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h1 className="text-3xl font-extrabold text-slate-900">
                        Welcome back, Admin 👋
                      </h1>
                      <p className="text-slate-500 text-sm mt-1">
                        Here's what's happening on StayNear today.
                      </p>
                    </div>

                    <button
                      onClick={fetchDashboardData}
                      className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                      Refresh Dashboard
                    </button>
                  </div>

                  <DashboardCards stats={stats} />

                  <QuickActions pending={stats.pendingProperties} setActiveTab={setActiveTab} />

                  <PendingProperties
                    properties={properties}
                    onView={handleViewProperty}
                    setActiveTab={setActiveTab}
                  />

                  <RecentUsers users={users} />
                </div>
              )}

              {activeTab === "properties" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Property Moderation</h1>
                    <p className="text-slate-500 text-sm mt-1">Approve, reject, or delete properties</p>
                  </div>
                  <PropertyTable
                    properties={properties}
                    onView={handleViewProperty}
                  />
                </div>
              )}

              {activeTab === "users" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Change user roles or delete accounts</p>
                  </div>
                  <UserTable
                    users={users}
                    onDeleteUser={handleDeleteUser}
                    onChangeRole={handleChangeUserRole}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Property Details Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl">
            <button
              onClick={handleClosePropertyModal}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-650 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4 pr-10">
              {selectedProperty.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-600">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-base">Key Specs</h3>
                <div className="space-y-2.5">
                  <p>
                    <span className="font-bold text-slate-700">Type:</span>{" "}
                    {selectedProperty.propertyType}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Gender suitability:</span>{" "}
                    {selectedProperty.gender}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Price (Rent):</span> ₹
                    {selectedProperty.price} / month
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Security Deposit:</span> ₹
                    {selectedProperty.securityDeposit}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Room Type:</span>{" "}
                    {selectedProperty.roomType}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Available Beds:</span>{" "}
                    {selectedProperty.availableBeds}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Verification Status:</span>{" "}
                    {selectedProperty.verified ? "Approved" : "Pending"}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Featured Status:</span>{" "}
                    {selectedProperty.featured ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-base">Location & College Details</h3>
                <div className="space-y-2.5">
                  <p>
                    <span className="font-bold text-slate-700">Address:</span>{" "}
                    {selectedProperty.location}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">City:</span> {selectedProperty.city}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">State:</span>{" "}
                    {selectedProperty.state}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Pincode:</span>{" "}
                    {selectedProperty.pincode}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Nearby College:</span>{" "}
                    {selectedProperty.nearbyCollege}
                  </p>
                  <p>
                    <span className="font-bold text-slate-700">Distance from College:</span>{" "}
                    {selectedProperty.distanceFromCollege}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-2 text-base">Description</h3>
              <p className="text-slate-600 leading-relaxed">{selectedProperty.description}</p>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-3 text-base">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.amenities?.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-teal-50 text-teal-700 font-semibold px-3.5 py-2 rounded-full text-xs border border-teal-100"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {selectedProperty.owner && (
              <div className="mt-8 border-t border-slate-100 pt-6 bg-slate-50 p-6 rounded-2xl border border-slate-150">
                <h3 className="font-bold text-slate-800 mb-3 text-base">Owner Information</h3>
                <div className="grid md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                  <p>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      NAME
                    </span>{" "}
                    {selectedProperty.owner.name}
                  </p>
                  <p>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      EMAIL
                    </span>{" "}
                    {selectedProperty.owner.email}
                  </p>
                  <p>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      PHONE
                    </span>{" "}
                    {selectedProperty.owner.phone || "N/A"}
                  </p>
                </div>
              </div>
            )}

            {selectedProperty.images && selectedProperty.images.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-800 mb-4 text-base">Property Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProperty.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.startsWith("http") ? img : `http://localhost:5002${img}`}
                      alt={`gallery-${idx}`}
                      className="w-full h-40 object-cover rounded-xl border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-800 mb-4 text-base">Actions</h3>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-end gap-3">
                {selectedProperty.verified ? (
                  <button
                    onClick={handleModalReject}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                  >
                    <X size={18} />
                    Reject Approval
                  </button>
                ) : (
                  <button
                    onClick={handleModalApprove}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Check size={18} />
                    Approve Property
                  </button>
                )}

                <button
                  onClick={handleModalDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Delete Property
                </button>

                <button
                  onClick={handleClosePropertyModal}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Admin;