import { Link } from "react-router-dom";
import {
  Building2,
  Search,
  Heart,
  MessageSquare,
  User,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2"
        >
          <Building2
            size={30}
            className="text-teal-700"
          />

          <span className="text-2xl font-bold text-slate-900">
            StayNear
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/home"
            className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
          >
            <Search size={18} />
            Home
          </Link>

          <Link
            to="/explore"
            className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
          >
            <Search size={18} />
            Explore
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
          >
            <Heart size={18} />
            Wishlist
          </Link>

          <Link
            to="/inquiries"
            className="flex items-center gap-2 text-slate-700 hover:text-teal-700"
          >
            <MessageSquare size={18} />
            Inquiries
          </Link>
        </div>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200"
        >
          <User size={18} />
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;