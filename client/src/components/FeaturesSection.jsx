import {
  ShieldCheck,
  MapPinned,
  MessageSquareMore,
} from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Listings",
      description:
        "Every property is physically verified by our team to ensure safety, authenticity, and quality standards before it is listed.",
    },
    {
      icon: MapPinned,
      title: "Location-based Search",
      description:
        "Find PGs based on your college, university, or workplace and compare accommodations within your preferred distance.",
    },
    {
      icon: MessageSquareMore,
      title: "Direct Inquiry",
      description:
        "Connect directly with property owners through StayNear's inquiry system to ask questions before scheduling a visit.",
    },
  ];

  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-teal-700 font-semibold text-sm">
            Why Choose StayNear
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Everything You Need To Find
            <br />
            Your Perfect Stay
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
            StayNear helps students discover verified accommodations,
            compare properties, and connect directly with owners through
            one secure platform.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-slate-200
                  p-9
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}

                <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center mb-8">
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </div>

                {/* Title */}

                <h3 className="text-3xl font-bold text-teal-700 mb-5">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="text-slate-600 text-lg leading-8">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;