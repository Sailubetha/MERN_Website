import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Shield, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 header-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: SAC Brand & Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#ff5733] to-amber-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#ff5733]" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-cinzel flex items-center gap-2">
                SAC PORTAL
              </span>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">Student Activity Council</p>
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/") ? "text-[#ff5733] bg-orange-50" : "text-slate-700 hover:text-[#ff5733] hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            <a
              href="#about"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#ff5733] hover:bg-slate-50 transition-all"
            >
              About Us
            </a>
            <Link
              to="/sac-body"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/sac-body") ? "text-[#ff5733] bg-orange-50" : "text-slate-700 hover:text-[#ff5733] hover:bg-slate-50"
              }`}
            >
              SAC Body
            </Link>
            <Link
              to="/events"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive("/events") ? "text-[#ff5733] bg-orange-50" : "text-slate-700 hover:text-[#ff5733] hover:bg-slate-50"
              }`}
            >
              Events
            </Link>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#ff5733] hover:bg-slate-50 transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Right: Register Now CTA & Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all"
                >
                  <Shield className="w-4 h-4 text-amber-400" /> Admin Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/events?status=upcoming"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#ff5733] hover:bg-[#e04826] text-white shadow-md shadow-[#ff5733]/25 transition-all hover:scale-105"
                >
                  Register Now
                </Link>
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 p-2 rounded-xl text-slate-500 hover:text-[#ff5733] hover:bg-orange-50 transition-all"
                  title="Admin Portal"
                >
                  <Shield className="w-5 h-5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:text-[#ff5733] hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#ff5733]"
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#ff5733]"
          >
            About Us
          </a>
          <Link
            to="/sac-body"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#ff5733]"
          >
            SAC Body
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#ff5733]"
          >
            Events
          </Link>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-orange-50 hover:text-[#ff5733]"
          >
            Contact
          </a>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/events?status=upcoming"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-[#ff5733] text-white shadow-md"
            >
              Register Now
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
