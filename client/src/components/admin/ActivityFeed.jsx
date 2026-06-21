import {
  CheckCircle2,
  UserPlus,
  Building2,
  Trash2,
  ShieldCheck,
  Clock3,
} from "lucide-react";

function ActivityFeed({ stats }) {
  const activities = [
    {
      icon: <ShieldCheck size={18} />,
      title: `${stats.approvedProperties || 0} properties approved`,
      subtitle: "Verified by administrators",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <Clock3 size={18} />,
      title: `${stats.pendingProperties || 0} properties awaiting approval`,
      subtitle: "Needs admin review",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Building2 size={18} />,
      title: `${stats.totalProperties || 0} properties listed`,
      subtitle: "Currently available on StayNear",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <UserPlus size={18} />,
      title: `${stats.totalUsers || 0} registered users`,
      subtitle: "Across seekers, owners and admins",
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: <CheckCircle2 size={18} />,
      title: "Platform is running smoothly",
      subtitle: "No critical issues detected",
      color: "bg-teal-100 text-teal-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest platform overview
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">
                {activity.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {activity.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;