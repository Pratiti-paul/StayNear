function Home() {
  return (
    <div className="staynear-page-shell px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="staynear-card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
                StayNear Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">
                Welcome Seeker
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover student-friendly stays with clean rooms, trusted owners,
                and a simple booking experience designed to feel polished on every
                device.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="staynear-button-primary">Explore Homes</button>
                <button className="staynear-button-secondary">Browse Wishlist</button>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-gradient-to-br from-cyan-50 via-slate-50 to-orange-50 px-6 py-8 sm:px-10 lg:border-l lg:border-t-0">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
                <p className="text-sm font-semibold text-slate-500">Quick Stats</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Verified listings</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">120+</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Saved stays</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">18</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 px-4 py-4">
                    <p className="text-sm text-slate-500">Trusted owners</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">42</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;