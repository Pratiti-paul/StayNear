import {
  MapPin,
  ShieldCheck,
  Wallet,
  User,
} from "lucide-react";

function HeroContent() {
  return (
    <>
      <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] text-[#147f97] tracking-tight">
        <span className="block">Find Your Perfect PG</span>
        <span className="block">Near Your College</span>
      </h1>

      <p className="mt-6 text-[15px] sm:text-base lg:text-lg leading-relaxed text-slate-700 max-w-[420px] font-medium">
        Verified stays, trusted owners, and everything you need to find your next home away from home
      </p>

      <div className="flex flex-row flex-wrap items-start justify-start gap-4 sm:gap-6 lg:gap-8 mt-12">
        <Feature
          icon={<MapPin size={26} className="text-[#00a2c7] stroke-[1.5]" />}
          title={<>Near Your<br />College</>}
        />

        <Feature
          icon={<ShieldCheck size={26} className="text-[#00a2c7] stroke-[1.5]" />}
          title={<>Verified And<br />Trusted</>}
        />

        <Feature
          icon={<Wallet size={26} className="text-[#00a2c7] stroke-[1.5]" />}
          title={<>Budget<br />Friendly</>}
        />

        <Feature
          icon={<User size={26} className="text-[#00a2c7] stroke-[1.5]" />}
          title={<>For<br />Students</>}
        />
      </div>
    </>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-2 w-[75px] sm:w-[85px]">
      <div className="w-10 h-10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-[1.3] tracking-wide">
        {title}
      </span>
    </div>
  );
}

export default HeroContent;