import { Trash2 } from "lucide-react";

function UserTable({ users, onDeleteUser, onChangeRole }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">User Accounts</h2>
        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
          Total: {users.length} Users
        </span>
      </div>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-5">Name</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Date Joined</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-8 py-4 font-bold text-slate-800">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => onChangeRole(user._id, e.target.value)}
                      className="rounded-xl border border-slate-250 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
                    >
                      <option value="seeker">Seeker</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-8 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onDeleteUser(user._id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Delete Account"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 font-medium">No user accounts found.</div>
      )}
    </div>
  );
}

export default UserTable;
