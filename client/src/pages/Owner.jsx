function Owner() {
  return (
    <div className="staynear-page-shell px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="staynear-card overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-teal-700 to-cyan-600 px-6 py-8 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-100/90">
              Owner Area
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Owner Portal
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 sm:text-base">
              Manage your property listings, review inquiries, and keep your
              rentals looking polished for students searching nearby stays.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Listings</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">08</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Inquiries</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Availability</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">91%</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Owner;