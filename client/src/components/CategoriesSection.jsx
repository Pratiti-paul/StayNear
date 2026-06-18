import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  BedDouble,
  Users,
  ArrowRight,
} from "lucide-react";

function CategoriesSection() {
  const categories = [
    {
      title: "Girls PG",
      description:
        "Safe, secure and verified accommodation designed for female students.",
      listings: "250+ Listings",
      icon: Users,
    },
    {
      title: "Boys PG",
      description:
        "Affordable rooms near colleges with modern amenities and facilities.",
      listings: "320+ Listings",
      icon: BedDouble,
    },
    {
      title: "Student Hostels",
      description:
        "Budget-friendly hostels offering comfortable student living.",
      listings: "180+ Listings",
      icon: Building2,
    },
    {
      title: "Shared Flats",
      description:
        "Fully furnished shared apartments for independent student living.",
      listings: "140+ Listings",
      icon: Home,
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">

          <div>
            <h2 className="text-5xl font-bold text-slate-900">
              Explore by Category
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Browse verified accommodation options tailored to every
              student's lifestyle, comfort and budget.
            </p>
          </div>

          <Link
            to="/explore"
            className="mt-6 md:mt-0 font-semibold text-teal-700 hover:text-teal-800 transition"
          >
            View All Categories →
          </Link>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to="/explore"
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl"
              >
                {/* Icon */}

                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50 transition-all duration-300 group-hover:bg-teal-600">

                  <Icon
                    size={38}
                    className="text-teal-700 transition-all duration-300 group-hover:text-white"
                  />

                </div>

                {/* Title */}

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

                {/* Listings */}

                <div className="mt-8 flex items-center justify-between">

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                    {item.listings}
                  </span>

                  <div className="flex items-center gap-2 font-semibold text-teal-700 transition-all duration-300 group-hover:gap-3">

                    Explore

                    <ArrowRight size={18} />

                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default CategoriesSection;