function CategoriesSection() {
  const categories = [
    {
      title: "Girls PG",
      price: "Starting from ₹6,500/month",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
    },
    {
      title: "Boys PG",
      price: "Starting from ₹5,500/month",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
    },
    {
      title: "Student Hostels",
      price: "Starting from ₹4,000/month",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700",
    },
    {
      title: "Shared Flats",
      price: "Starting from ₹8,000/month",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
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

            <p className="mt-4 text-lg text-slate-600">
              Find accommodation that perfectly matches your lifestyle,
              comfort and budget.
            </p>
          </div>

          <button className="mt-6 md:mt-0 text-teal-700 font-semibold hover:text-teal-800 transition">
            View All Categories →
          </button>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-md cursor-pointer"
            >
              {/* Image */}

              <img
                src={item.image}
                alt={item.title}
                className="h-[470px] w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Dark Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}

              <div className="absolute bottom-0 left-0 p-6">

                <h3 className="text-4xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-lg text-slate-200">
                  {item.price}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default CategoriesSection;