import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Building2,
  ChevronDown,
  Plus,
  User,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const userName = localStorage.getItem("name") || "User";
  const userRole = localStorage.getItem("role");

  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    toast("Are you sure you want to logout?", {
      action: {
        label: "Logout",
        onClick: () => {
          localStorage.clear();
          toast.success("Logged out successfully");
          navigate("/");
        },
      },
    });
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

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

            {/* List Property */}
            <Link
              to={userRole === "owner" ? "/owner" : "/login"}
              className="hidden md:flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 hover:shadow-lg"
            >
              <Plus size={18} />
              List Your Property
            </Link>


            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>

              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-semibold text-white">
                  {firstLetter}
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-xs text-slate-400">
                    Hi,
                  </p>

                  <p className="font-medium leading-none text-white">
                    {userName}
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-300 ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

                  {/* Header */}
                  <div className="border-b border-slate-100 px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {userName}
                    </p>

                    <p className="text-sm capitalize text-slate-500">
                      {userRole}
                    </p>
                  </div>

                  {/* Profile */}
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpenMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-700 hover:bg-slate-50 transition"
                  >
                    <User size={18} />
                    My Profile
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-5 py-3 text-left text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;