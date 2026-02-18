import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#120c05]/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-md text-white font-bold">🚗</div>
            <span className="text-xl font-bold text-white">
              LUX<span className="text-orange-500">DRIVE</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-200">
            <a href="#about" className="hover:text-orange-500 transition">About</a>
            <a href="#popular-sales" className="hover:text-orange-500 transition">Popular Sales</a>
            <a href="#testimonials" className="hover:text-orange-500 transition">Testimonials</a>
            <a href="#contact-us" className="hover:text-orange-500 transition">Contact Us</a>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="text-gray-200 font-semibold hover:text-orange-500 transition">
              Login
            </button>
            <button className="bg-orange-500 px-6 py-2 rounded-lg font-bold text-white hover:bg-orange-400 transition">
              Join Now
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
