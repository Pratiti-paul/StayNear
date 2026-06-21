import { UserRound } from "lucide-react";

function RecentUsers({ users }) {
  const recentUsers = Array.isArray(users)
    ? [...users]
        .filter((user) => user && typeof user === "object")
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 5)
    : [];

  const badgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "owner":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-teal-100 text-teal-700";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <UserRound
          size={24}
          className="text-teal-600"
        />

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Users
          </h2>

          <p className="text-sm text-slate-500">
            Latest registrations on StayNear
          </p>
        </div>
      </div>

      {recentUsers.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No users found.
        </div>
      ) : (
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div
              key={user._id || user.email || user.name}
              className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {user.name || "Unknown User"}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {user.email || "No email available"}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    Joined {user.createdAt ? formatDate(user.createdAt) : "Unknown"}
                  </p>
                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${badgeColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentUsers;