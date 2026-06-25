import { LayoutDashboard, Building2, Users2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "properties", label: "Properties", icon: <Building2 size={20} /> },
    { id: "users", label: "User Management", icon: <Users2 size={20} /> },
  ];

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

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-[calc(100vh-80px)] flex flex-col justify-between p-6">
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest pl-3">
            Admin Portal
          </p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition cursor-pointer ${
                activeTab === item.id
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-red-400 hover:bg-red-950/30 transition cursor-pointer mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;
