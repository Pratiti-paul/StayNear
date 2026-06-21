import { ClipboardCheck, Users, Building2 } from "lucide-react";

function QuickActions({ pending, setActiveTab }) {
  const actions = [
    {
      title: "Review Pending",
      subtitle: `${pending} Properties Waiting`,
      icon: <ClipboardCheck size={28} />,
      action: () => setActiveTab("properties"),
      color: "bg-amber-50 border-amber-200 text-amber-700",
    },
    {
      title: "Manage Properties",
      subtitle: "View all listings",
      icon: <Building2 size={28} />,
      action: () => setActiveTab("properties"),
      color: "bg-teal-50 border-teal-200 text-teal-700",
    },
    {
      title: "Manage Users",
      subtitle: "View all users",
      icon: <Users size={28} />,
      action: () => setActiveTab("users"),
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {actions.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`text-left rounded-3xl border p-6 transition hover:shadow-lg hover:-translate-y-1 ${item.color}`}
        >
          {item.icon}

          <h3 className="font-bold text-lg mt-4">
            {item.title}
          </h3>

          <p className="text-sm mt-1 opacity-80">
            {item.subtitle}
          </p>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
