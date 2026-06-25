import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryCard from "../components/InquiryCard";
import InquiryDrawer from "../components/InquiryDrawer";
import { getInquiries } from "../services/propertyService";
import { Search, MessageSquare, ChevronDown } from "lucide-react";
import { toast } from "sonner";

function Inquiries() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters, Search, Sort States
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Drawer States
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await getInquiries();
      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenDrawer = (inq) => {
    setSelectedInquiry(inq);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedInquiry(null);
  };

  // Counts for filter chips
  const allCount = inquiries.length;
  const pendingCount = inquiries.filter(
    (inq) => inq.status?.toLowerCase() === "pending"
  ).length;
  const acceptedCount = inquiries.filter(
    (inq) => inq.status?.toLowerCase() === "accepted"
  ).length;
  const rejectedCount = inquiries.filter(
    (inq) => inq.status?.toLowerCase() === "rejected"
  ).length;

  // Filter, search, and sort calculations
  const processedInquiries = inquiries
    .filter((inq) => {
      // 1. Status Filter
      if (statusFilter !== "all" && inq.status?.toLowerCase() !== statusFilter) {
        return false;
      }
      // 2. Search query filter
      if (searchQuery.trim() !== "") {
        const title = inq.property?.title?.toLowerCase() || "";
        if (!title.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900">
              My Inquiries
            </h1>
            <p className="text-slate-500 text-base mt-2 font-medium">
              Track all property inquiries you've sent to owners.
            </p>
          </div>

          {/* Toolbar: Search, Filters & Sort */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Search Input & Status Chips */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center flex-grow">
              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search by property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm font-medium text-slate-800 transition bg-slate-50/50"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {/* All */}
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === "all"
                      ? "bg-teal-55 border-teal-500 text-teal-700 font-extrabold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                  }`}
                >
                  <span>All</span>
                  <span
                    className={`text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center transition-colors ${
                      statusFilter === "all" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {allCount}
                  </span>
                </button>

                {/* Pending */}
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === "pending"
                      ? "bg-amber-50 border-amber-500 text-amber-800 font-extrabold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-355"
                  }`}
                >
                  <span>Pending</span>
                  <span
                    className={`text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center transition-colors ${
                      statusFilter === "pending" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {pendingCount}
                  </span>
                </button>

                {/* Accepted */}
                <button
                  onClick={() => setStatusFilter("accepted")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === "accepted"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-extrabold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-355"
                  }`}
                >
                  <span>Accepted</span>
                  <span
                    className={`text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center transition-colors ${
                      statusFilter === "accepted" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {acceptedCount}
                  </span>
                </button>

                {/* Rejected */}
                <button
                  onClick={() => setStatusFilter("rejected")}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    statusFilter === "rejected"
                      ? "bg-rose-50 border-rose-500 text-rose-800 font-extrabold"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-355"
                  }`}
                >
                  <span>Rejected</span>
                  <span
                    className={`text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center transition-colors ${
                      statusFilter === "rejected" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {rejectedCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0 w-full md:w-44">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 pl-4 pr-10 py-3 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm font-bold text-slate-700 bg-white transition cursor-pointer appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Cards Area (Grid or Empty or Skeletons) */}
          {loading ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-0 h-[480px] flex flex-col"
                >
                  <div className="h-64 bg-slate-250 animate-pulse w-full shrink-0" />
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse" />
                      <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
                      <div className="h-8 bg-slate-200 rounded w-1/3 animate-pulse mt-4" />
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
                        <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse" />
                      </div>
                    </div>
                    <div className="h-12 bg-slate-200 rounded-2xl w-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : processedInquiries.length > 0 ? (
            /* Main Responsive Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processedInquiries.map((inquiry) => (
                <InquiryCard
                  key={inquiry._id}
                  inquiry={inquiry}
                  onViewDetails={handleOpenDrawer}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
                <MessageSquare size={38} />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900">
                No inquiries yet
              </h2>

              <p className="text-slate-500 mt-3 font-medium text-base">
                Explore properties and contact owners to find your perfect stay.
              </p>

              <button
                onClick={() => navigate("/explore")}
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-teal-600 px-8 py-4 font-bold text-white hover:bg-teal-700 hover:shadow-lg transition cursor-pointer shadow-md shadow-teal-600/10"
              >
                Explore Properties
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Slide-out details drawer */}
      <InquiryDrawer
        inquiry={selectedInquiry}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      <Footer />
    </>
  );
}

export default Inquiries;