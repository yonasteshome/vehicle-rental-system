import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1f160c] text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500 mb-4">LuxDrive</h2>
          <p className="text-gray-300">
            Premium ride service across Ethiopia. We ensure comfort, safety, and fast pick-up from multiple locations.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-orange-400 transition">Home</a></li>
            <li><a href="#locations" className="hover:text-orange-400 transition">Locations</a></li>
            <li><a href="#services" className="hover:text-orange-400 transition">Services</a></li>
            <li><a href="#contact-us" className="hover:text-orange-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-orange-400 transition">Facebook</a>
            <a href="#" className="hover:text-orange-400 transition">Twitter</a>
            <a href="#" className="hover:text-orange-400 transition">Instagram</a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} LuxDrive. All rights reserved.
      </div>
    </footer>
  );
}
