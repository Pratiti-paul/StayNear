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
  return (
    <aside className="sticky top-28 bg-white rounded-3xl border border-slate-200 shadow-md p-6 h-fit">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={20}
            className="text-teal-600"
          />
          <h2 className="text-xl font-bold text-slate-900">
            Filters
          </h2>
        </div>

        <button
          onClick={onClear}
          className="text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
        >
          Clear All
        </button>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Monthly Budget
        </label>

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none cursor-pointer"
        >
          <option value={3000}>₹3,000</option>
          <option value={5000}>Up to ₹5,000</option>
          <option value={8000}>Up to ₹8,000</option>
          <option value={10000}>Up to ₹10,000</option>
          <option value={15000}>Up to ₹15,000</option>
          <option value={20000}>Up to ₹20,000</option>
          <option value={25000}>Up to ₹25,000</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Property Type
        </label>

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="Girls PG">Girls PG</option>
          <option value="Boys PG">Boys PG</option>
          <option value="Hostel">Hostel</option>
          <option value="Shared Flat">Shared Flat</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Gender
        </label>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none cursor-pointer"
        >
          <option value="">All</option>
          <option value="Girls">Girls</option>
          <option value="Boys">Boys</option>
          <option value="Co-ed">Co-ed</option>
        </select>
      </div>

    </aside>
  );
}

export default FilterSidebar;