import { Star } from "lucide-react";

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maya JaiSingh",
      college: "Delhi University",
      image: "https://cdn-icons-png.flaticon.com/512/4537/4537097.png",
      rating: 5,
      review:
        "I was looking for a girls' PG near North Campus and found one within my budget in just two days. The verified badge gave me confidence before visiting the property.",
    },
    {
      name: "Sonakshi Bose",
      college: "Rishihood University",
      image: "https://cdn-icons-png.flaticon.com/512/4537/4537097.png",
      rating: 4,
      review:
        "The filters made it really easy to compare PGs based on rent and distance from my college. I found the perfect stay without wasting hours searching online.",
    },
    {
      name: "Dev Dixit",
      college: "Thapar University",
      image: "https://cdn-icons-png.flaticon.com/512/522/522294.png",
      rating: 5,
      review:
        "Finding a good PG as an outstation student was stressful, but StayNear made the process simple. The photos matched exactly what I saw during my visit.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.25em] text-teal-700 font-semibold text-sm">
            Testimonials
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            What Students Say About StayNear
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Hear from students who found their perfect accommodation through
            StayNear.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>

              {/* Review */}
              <p className="italic text-slate-600 leading-8 text-lg min-h-[170px]">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-200"
                />

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.college}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;