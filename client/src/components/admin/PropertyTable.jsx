import { ShieldCheck, ShieldAlert, Trash2, Eye, Check, X } from "lucide-react";

function PropertyTable({ properties, onView, onApprove, onReject, onDelete }) {
  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      const img = images[0];
      return img.startsWith("http")
        ? img
        : `http://localhost:5002${img}`;
    }

    return "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=80&q=80";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Property Listings
        </h2>

        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
          Total: {properties.length} Listings
        </span>
      </div>

      {properties.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-5">Property Name</th>
                <th className="px-6 py-5">Owner</th>
                <th className="px-6 py-5">City</th>
                <th className="px-6 py-5">Monthly Rent</th>
                <th className="px-6 py-5">Verification</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {properties.map((prop) => (
                <tr
                  key={prop._id}
                  className="hover:bg-slate-50/50 transition"
                >
                  {/* Property */}
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={getImageUrl(prop.images)}
                        alt={prop.title}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-150 shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 truncate max-w-[220px]">
                          {prop.title}
                        </p>

                        <p className="text-xs text-slate-400 truncate max-w-[220px]">
                          {[prop.city, prop.state]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">
                      {prop.owner ? prop.owner.name : "Unknown"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {prop.owner ? prop.owner.email : ""}
                    </p>
                  </td>

                  {/* City */}
                  <td className="px-6 py-4 font-semibold text-slate-600">
                    {prop.city}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-bold text-teal-700">
                    ₹{prop.price}
                  </td>

                  {/* Verification */}
                  <td className="px-6 py-4">
                    {prop.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
                        <ShieldCheck size={14} />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-100">
                        <ShieldAlert size={14} />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(prop)}
                        className="p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      {prop.verified ? (
                        <button
                          onClick={() => onReject(prop._id)}
                          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="Reject / Suspend"
                        >
                          <X size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => onApprove(prop._id)}
                          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(prop._id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="Delete Permanently"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-16 text-center text-slate-400 font-medium">
          No property listings found.
        </div>
      )}
    </div>
  );
}

export default PropertyTable;