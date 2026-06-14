function Admin() {
  return (
    <div className="staynear-page-shell px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="staynear-card overflow-hidden">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 via-teal-800 to-cyan-700 px-6 py-8 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100/90">
              Administration
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Admin Panel
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-100/90 sm:text-base">
              Keep the platform organized with a clean, high-contrast dashboard
              for oversight, approvals, and moderation.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Users</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">1,248</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Active PGs</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">312</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Pending Reviews</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">19</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Admin;