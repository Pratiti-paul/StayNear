import { Search, MapPin } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-3 flex items-center gap-3">

      {/* Location Icon */}

      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
        <MapPin className="text-teal-600" size={22} />
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search by college, locality or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none text-lg placeholder:text-slate-400"
      />

      {/* Button */}

      <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition">

        <Search size={18} />

        Search

      </button>

    </div>
  );
}

export default SearchBar;