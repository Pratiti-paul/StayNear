import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Bell,
  ChevronDown,
  Plus,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") || "User";
  const userRole = localStorage.getItem("role");

  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center">
              <Building2
                size={28}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white leading-none">
                StayNear
              </h1>

              <p className="text-xs text-slate-400 mt-1">
                Find. Compare. Connect.
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              to="/home"
              className="font-medium text-slate-300 hover:text-teal-400 transition"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="font-medium text-slate-300 hover:text-teal-400 transition"
            >
              Explore
            </Link>

            <Link
              to="/wishlist"
              className="font-medium text-slate-300 hover:text-teal-400 transition"
            >
              Wishlist
            </Link>

            <Link
              to="/inquiries"
              className="font-medium text-slate-300 hover:text-teal-400 transition"
            >
              Inquiries
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* List Property Button */}
            <Link
              to={userRole === "owner" ? "/owner" : "/login"}
              className="hidden md:flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 hover:shadow-lg"
            >
              <Plus size={18} />
              List Your Property
            </Link>

            {/* Notification */}
            <button className="rounded-xl p-2 hover:bg-slate-800 transition">
              <Bell
                size={22}
                className="text-slate-300"
              />
            </button>

            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700 transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
                {firstLetter}
              </div>

              <div className="hidden md:block">
                <p className="text-xs text-slate-400">
                  Hi,
                </p>

                <p className="font-medium leading-none text-white">
                  {userName}
                </p>
              </div>

              <ChevronDown
                size={18}
                className="text-slate-400"
              />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;