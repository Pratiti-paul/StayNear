import { Search } from "lucide-react";

function HeroSearch() {
  return (
    <div className="mt-14 bg-white rounded-3xl shadow-xl p-6">

      <div className="grid lg:grid-cols-4 gap-4">

        <div>

          <label className="text-sm font-semibold text-slate-500">

            College

          </label>

          <input
            type="text"
            placeholder="Delhi University"
            className="w-full mt-2 border-none outline-none text-lg"
          />

        </div>

        <div>

          <label className="text-sm font-semibold text-slate-500">

            Budget

          </label>

          <select className="w-full mt-2 bg-transparent outline-none">

            <option>₹5k - ₹8k</option>

            <option>₹8k - ₹12k</option>

            <option>₹12k+</option>

          </select>

        </div>

        <div>

          <label className="text-sm font-semibold text-slate-500">

            Room Type

          </label>

          <select className="w-full mt-2 bg-transparent outline-none">

            <option>Girls PG</option>

            <option>Boys PG</option>

            <option>Hostel</option>

            <option>Flat</option>

          </select>

        </div>

        <button className="bg-teal-600 hover:bg-teal-700 rounded-2xl text-white flex items-center justify-center gap-3 font-semibold text-lg">

          <Search size={22} />

          Search

        </button>

      </div>

    </div>
  );
}

export default HeroSearch;