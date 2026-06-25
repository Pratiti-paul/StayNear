import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Building2,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

function OwnerNavbar() {
  const navigate = useNavigate();

  const ownerName = localStorage.getItem("name") || "Owner";
  const firstLetter = ownerName.charAt(0).toUpperCase();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/owner"
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center">
            <Building2
              size={24}
              className="text-white"
            />
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

        {/* Profile Dropdown */}
        <div
          className="relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
          >
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
              {firstLetter}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-xs text-slate-500">
                Welcome
              </p>

              <p className="font-semibold text-slate-800">
                {ownerName}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">


              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 text-red-600 transition"
              >
                <LogOut size={18} />

                <span className="font-medium">
                  Logout
                </span>
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default OwnerNavbar;