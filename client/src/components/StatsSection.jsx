function StatsSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.25em] text-teal-700 font-semibold text-sm">
            Our Track Record
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Trusted by 10,000+ students globally
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div className="text-center">
            <h3 className="text-6xl font-bold text-teal-700">
              98%
            </h3>

            <p className="mt-4 text-xl text-slate-600 uppercase">
              Student Satisfaction
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-teal-700">
              5k+
            </h3>

            <p className="mt-4 text-xl text-slate-600 uppercase">
              Verified Listings
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-teal-700">
              120+
            </h3>

            <p className="mt-4 text-xl text-slate-600 uppercase">
              Partner Universities
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-6xl font-bold text-teal-700">
              24/7
            </h3>

            <p className="mt-4 text-xl text-slate-600 uppercase">
              Support Available
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default StatsSection;