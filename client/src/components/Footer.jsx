import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Send,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-teal-600 flex items-center justify-center">
                <Building2 size={24} className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  StayNear
                </h2>

                <p className="text-xs text-slate-400">
                  Find. Compare. Connect.
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Discover verified PGs, hostels and rental
              accommodations near colleges, universities and workplaces.
            </p>

            <div className="flex gap-3 mt-6">
              <Globe className="hover:text-teal-400 cursor-pointer" />
              <MessageCircle className="hover:text-teal-400 cursor-pointer" />
              <Send className="hover:text-teal-400 cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/home">Home</Link>
              <Link to="/explore">Explore</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/inquiries">Inquiries</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>
                  Rishihood University,
                  Sonipat, Haryana, India
                </span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>support@staynear.com</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <p className="text-sm text-slate-500">
            © 2026 StayNear. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Helping students find verified stays.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;