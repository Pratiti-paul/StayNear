import { Link } from "react-router-dom";
import { Building2, Bell, User } from "lucide-react";

function Navbar() {
return ( <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50"> <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

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

    {/* Navigation */}
    <div className="hidden md:flex items-center gap-10">
      <Link
        to="/home"
        className="font-medium text-slate-700 hover:text-teal-700 transition"
      >
        Home
      </Link>

      <Link
        to="/explore"
        className="font-medium text-slate-700 hover:text-teal-700 transition"
      >
        Explore
      </Link>

      <Link
        to="/wishlist"
        className="font-medium text-slate-700 hover:text-teal-700 transition"
      >
        Wishlist
      </Link>

      <Link
        to="/inquiries"
        className="font-medium text-slate-700 hover:text-teal-700 transition"
      >
        My Inquiries
      </Link>
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

      <button className="p-2 rounded-full hover:bg-slate-100 transition">
        <Bell size={20} />
      </button>

      <Link
        to="/profile"
        className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition"
      >
        <User size={18} />
        Profile
      </Link>

    </div>

  </div>
</nav>


);
}

export default Navbar;
