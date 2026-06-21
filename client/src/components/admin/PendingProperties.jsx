import { Eye, MapPin, Clock } from "lucide-react";

function PendingProperties({ properties, onView, setActiveTab }) {
  const pendingProperties = properties
    .filter((property) => !property.verified)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Pending Property Requests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Newly submitted properties waiting for approval
          </p>
        </div>

        <button
          onClick={() => setActiveTab("properties")}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          View All →
        </button>
      </div>

      {pendingProperties.length === 0 ? (
        <div className="text-center py-12">
          <Clock
            size={40}
            className="mx-auto text-slate-300 mb-4"
          />

          <h3 className="font-semibold text-slate-700">
            No Pending Requests
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            All submitted properties have been reviewed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProperties.map((property) => (
            <div
              key={property._id}
              className="flex items-center justify-between border border-slate-200 rounded-2xl p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    property.images?.length > 0
                      ? property.images[0].startsWith("http")
                        ? property.images[0]
                        : `http://localhost:5002${property.images[0]}`
                      : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300"
                  }
                  alt={property.title}
                  className="w-16 h-16 rounded-xl object-cover border"
                />

                <div>
                  <h3 className="font-bold text-slate-800">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                    <MapPin size={14} />
                    {property.city}, {property.state}
                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    Owner: {property.owner?.name || "Unknown"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onView(property)}
                className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition"
              >
                <Eye size={16} />
                Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingProperties;