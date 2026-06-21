import { Users, Building2, CheckCircle2, Clock3 } from "lucide-react";

function PlatformOverview({ users, properties }) {
  const totalUsers = Array.isArray(users) ? users.length : 0;
  const totalProperties = Array.isArray(properties) ? properties.length : 0;
  const approvedProperties = Array.isArray(properties)
    ? properties.filter((property) => property.verified).length
    : 0;
  const pendingProperties = Array.isArray(properties)
    ? properties.filter((property) => !property.verified).length
    : 0;

  const overviewCards = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <Users size={22} />,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      label: "Total Properties",
      value: totalProperties,
      icon: <Building2 size={22} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      label: "Approved",
      value: approvedProperties,
      icon: <CheckCircle2 size={22} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      label: "Pending",
      value: pendingProperties,
      icon: <Clock3 size={22} />,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Platform Overview</h2>
          <p className="text-sm text-slate-500 mt-1">
            A quick snapshot of users and listings on StayNear.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border p-4 ${card.color}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                  {card.label}
                </p>
                <p className="text-3xl font-extrabold mt-2 text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformOverview;