import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Wifi,
  ShieldCheck,
  CookingPot,
  Dumbbell,
  Users,
} from "lucide-react";

function RecommendedSection() {
  const properties = [
    {
      name: "Green Nest Girls PG",
      image: "/images/pg1.jpg",
      price: "₹7,500",
      location: "500m from Delhi University",
      badges: ["Verified", "Near Campus"],
      features: [
        { icon: BedDouble, text: "2 Sharing" },
        { icon: Bath, text: "Attached Bath" },
        { icon: Wifi, text: "Free WiFi" },
      ],
    },

    {
      name: "Scholars Boys PG",
      image: "/images/pg2.jpg",
      price: "₹6,800",
      location: "Near Rishihood University",
      badges: ["Verified"],
      features: [
        { icon: BedDouble, text: "Single Room" },
        { icon: CookingPot, text: "Meals" },
        { icon: Dumbbell, text: "Gym" },
      ],
    },

    {
      name: "Campus Hostel",
      image: "/images/pg3.jpg",
      price: "₹5,200",
      location: "300m from Thapar University",
      badges: ["Verified", "Popular"],
      features: [
        { icon: Users, text: "4 Sharing" },
        { icon: Wifi, text: "WiFi" },
        { icon: ShieldCheck, text: "24×7 Security" },
      ],
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="flex justify-between items-end mb-14">

          <div>
            <h2 className="text-5xl font-bold text-slate-900">
              Recommended For You
            </h2>

            <p className="mt-3 text-lg text-slate-600">
              Handpicked verified accommodations near popular universities.
            </p>
          </div>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              {/* Image */}

              <div className="relative">

                <img
                  src={property.image}
                  alt={property.name}
                  className="h-72 w-full object-cover"
                />

                {/* Badges */}

                <div className="absolute top-5 left-5 flex gap-2">

                  {property.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        badge === "Verified"
                          ? "bg-teal-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}

                </div>

                {/* Wishlist */}

                <button className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white">
                  <Heart size={22} className="text-slate-600" />
                </button>

              </div>

              {/* Content */}

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <h3 className="text-4xl font-bold text-slate-900">
                    {property.name}
                  </h3>

                  <div className="text-right">
                    <h4 className="text-4xl font-bold text-teal-700">
                      {property.price}
                    </h4>

                    <p className="text-slate-500 text-sm">
                      /month
                    </p>
                  </div>

                </div>

                {/* Location */}

                <div className="flex items-center gap-2 mt-5 text-slate-600">

                  <MapPin size={18} />

                  <span>{property.location}</span>

                </div>

                {/* Divider */}

                <div className="my-6 border-t border-slate-200"></div>

                {/* Features */}

                <div className="flex justify-between">

                  {property.features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.text}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        <Icon size={18} />

                        <span className="text-sm font-medium">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Button */}

        <div className="flex justify-center mt-16">

          <button className="border-2 border-teal-700 text-teal-700 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-teal-700 hover:text-white transition">
            Explore More Properties
          </button>

        </div>

      </div>
    </section>
  );
}

export default RecommendedSection;