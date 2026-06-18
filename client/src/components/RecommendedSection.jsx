import { Link } from "react-router-dom";
import properties from "../data/properties";
import PropertyCard from "./PropertyCard";

function RecommendedSection() {
  // Show only first 3 properties on Home page
  const recommendedProperties = properties.slice(0, 3);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">

          <div>
            <p className="text-teal-700 font-semibold uppercase tracking-[0.25em] text-sm">
              Featured Properties
            </p>

            <h2 className="mt-4 text-5xl font-bold text-slate-900">
              Recommended For You
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-8">
              Handpicked verified accommodations near popular universities,
              chosen for their comfort, affordability and student-friendly
              amenities.
            </p>
          </div>

          {/* Explore */}

          <Link
            to="/explore"
            className="mt-6 md:mt-0 text-teal-700 font-semibold hover:text-teal-800 transition"
          >
            Explore All Properties →
          </Link>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {recommendedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default RecommendedSection;