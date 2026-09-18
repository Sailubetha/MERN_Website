import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Phone, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff5733] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-cinzel tracking-tight">
                Student Activity Council
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Empowering student talent, cultural expression, technical innovation, and athletic excellence. SAC is the apex student activity council driving campus life.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-cinzel tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><Link to="/" className="hover:text-[#ff5733] transition-colors">Home Page</Link></li>
              <li><a href="#about" className="hover:text-[#ff5733] transition-colors">About SAC</a></li>
              <li><Link to="/sac-body" className="hover:text-[#ff5733] transition-colors">SAC Body & Clubs</Link></li>
              <li><Link to="/events" className="hover:text-[#ff5733] transition-colors">Events Directory</Link></li>
              <li><Link to="/admin/login" className="hover:text-[#ff5733] transition-colors">Admin Portal Login</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-cinzel tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff5733] flex-shrink-0 mt-0.5" />
                <span>SAC Building, Main Campus Grounds, Student Activity Center</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff5733] flex-shrink-0" />
                <span>+91 98765 43210 / 0863-234567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5733] flex-shrink-0" />
                <span>sac@college.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Student Activity Council (SAC). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="flex items-center gap-1.5 text-slate-400 hover:text-[#ff5733] transition-colors font-medium">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
