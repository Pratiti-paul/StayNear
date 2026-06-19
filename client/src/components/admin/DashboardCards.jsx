import { Users, UserCheck, Building, Clock, CheckCircle } from "lucide-react";

function DashboardCards({ stats }) {
  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: <Users size={26} />,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      label: "Total Owners",
      value: stats.totalOwners ?? 0,
      icon: <UserCheck size={26} />,
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      label: "Total Properties",
      value: stats.totalProperties ?? 0,
      icon: <Building size={26} />,
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      label: "Pending Properties",
      value: stats.pendingProperties ?? 0,
      icon: <Clock size={26} />,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      label: "Approved Properties",
      value: stats.approvedProperties ?? 0,
      icon: <CheckCircle size={26} />,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-3xl border p-6 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 ${card.bgColor}`}
        >
          <div className="p-3 bg-white/80 rounded-2xl shadow-sm shrink-0">
            {card.icon}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {card.label}
            </p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
