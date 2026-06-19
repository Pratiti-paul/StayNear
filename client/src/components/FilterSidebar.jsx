import { SlidersHorizontal } from "lucide-react";

function FilterSidebar({
  propertyType,
  setPropertyType,
  gender,
  setGender,
  maxPrice,
  setMaxPrice,
  onClear,
}) {
  const propertyTypes = ["Girls PG", "Boys PG", "Hostel", "Shared Flat"];
  const genders = ["Girls", "Boys", "Co-ed"];

  return (
    <aside className="sticky top-28 bg-white rounded-3xl shadow-md border border-slate-200 p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">Filters</h2>
        </div>

        <button
          onClick={onClear}
          className="text-sm text-teal-700 hover:text-teal-800 font-semibold cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Rent */}
      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-4">Max Monthly Rent: ₹{maxPrice}</h3>
        <input
          type="range"
          min="3000"
          max="25000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-teal-600 cursor-pointer"
        />
        <div className="flex justify-between mt-3 text-sm text-slate-500">
          <span>₹3,000</span>
          <span>₹25,000</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-4">Property Type</h3>
        <div className="space-y-3">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                checked={propertyType === type}
                onChange={() => setPropertyType(type)}
                className="accent-teal-600 w-4 h-4 cursor-pointer"
              />
              <span className="text-slate-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mt-8">
        <h3 className="font-semibold text-slate-900 mb-4">Gender</h3>
        <div className="space-y-3">
          {genders.map((item) => (
            <label key={item} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={gender === item}
                onChange={() => setGender(item)}
                className="accent-teal-600 cursor-pointer"
              />
              <span className="text-slate-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;