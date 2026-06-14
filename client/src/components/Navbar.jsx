import { Link } from "react-router-dom";
import {
  Building2,
  Bell,
  User,
} from "lucide-react";

function Navbar() {
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

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-10">
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

            <button className="p-2 rounded-xl hover:bg-slate-800 transition">
              <Bell
                size={20}
                className="text-slate-300"
              />
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
            >
              <User
                size={18}
                className="text-slate-300"
              />

              <span className="font-medium text-slate-300">
                Profile
              </span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;