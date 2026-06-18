import {
  IndianRupee,
  SlidersHorizontal,
  X,
} from "lucide-react";

function FilterSidebar() {
  return (
    <aside className="sticky top-28 bg-white rounded-3xl shadow-md border border-slate-200 p-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={20}
            className="text-teal-600"
          />

          <h2 className="text-xl font-bold text-slate-900">
            Filters
          </h2>
        </div>

        <button className="text-sm text-teal-700 hover:text-teal-800 font-semibold">
          Clear All
        </button>

      </div>

      {/* Rent */}

      <div className="mt-8">

        <h3 className="font-semibold text-slate-900 mb-4">
          Monthly Rent
        </h3>

        <input
          type="range"
          min="3000"
          max="20000"
          defaultValue="9000"
          className="w-full accent-teal-600"
        />

        <div className="flex justify-between mt-3 text-sm text-slate-500">
          <span>₹3,000</span>
          <span>₹20,000</span>
        </div>

      </div>

      {/* Property Type */}

      <div className="mt-8">

        <h3 className="font-semibold text-slate-900 mb-4">
          Property Type
        </h3>

        <div className="space-y-3">

          {[
            "Girls PG",
            "Boys PG",
            "Student Hostel",
            "Shared Flat",
            "Studio Apartment",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-teal-600 w-4 h-4"
              />

              <span className="text-slate-700">
                {item}
              </span>
            </label>
          ))}

        </div>

      </div>

      {/* Gender */}

      <div className="mt-8">

        <h3 className="font-semibold text-slate-900 mb-4">
          Gender
        </h3>

        <div className="space-y-3">

          {[
            "Girls",
            "Boys",
            "Co-ed",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                className="accent-teal-600"
              />

              <span>{item}</span>
            </label>
          ))}

        </div>

      </div>

      {/* Amenities */}

      <div className="mt-8">

        <h3 className="font-semibold text-slate-900 mb-4">
          Amenities
        </h3>

        <div className="flex flex-wrap gap-3">

          {[
            "WiFi",
            "AC",
            "Meals",
            "Laundry",
            "Parking",
            "Power Backup",
            "CCTV",
            "Attached Bath",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-2 rounded-full bg-slate-100 hover:bg-teal-600 hover:text-white transition text-sm"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Distance */}

      <div className="mt-8">

        <h3 className="font-semibold text-slate-900 mb-4">
          Distance from College
        </h3>

        <div className="space-y-3">

          {[
            "Under 500m",
            "Under 1 km",
            "Under 2 km",
            "Any Distance",
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="distance"
                className="accent-teal-600"
              />

              <span>{item}</span>
            </label>
          ))}

        </div>

      </div>

      {/* Verified */}

      <div className="mt-8 flex items-center justify-between">

        <span className="font-semibold text-slate-900">
          Verified Only
        </span>

        <input
          type="checkbox"
          className="accent-teal-600 w-5 h-5"
          defaultChecked
        />

      </div>

      {/* Apply */}

      <button className="w-full mt-10 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition">
        Apply Filters
      </button>

    </aside>
  );
}

export default FilterSidebar;