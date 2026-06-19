import { Link, useNavigate } from "react-router-dom";
import { Building2, Bell, LogOut } from "lucide-react";

function OwnerNavbar() {
  const navigate = useNavigate();

  const ownerName = localStorage.getItem("name") || "Owner";
  const firstLetter = ownerName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/owner" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center">
            <Building2 className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              StayNear
            </h1>

            <p className="text-xs text-slate-500">
              Owner Dashboard
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <button className="relative p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer">
            <Bell size={22} className="text-slate-600" />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
              {firstLetter}
            </div>

            <div className="hidden md:block">
              <p className="text-xs text-slate-500">Welcome</p>
              <p className="font-semibold text-slate-800">
                {ownerName}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-semibold cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default OwnerNavbar;