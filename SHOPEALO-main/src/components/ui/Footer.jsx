import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-4 bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Links de navegación */}
        <div className="mb-4">
          <a href="#" className="mx-2 text-white no-underline hover:underline">
            Home
          </a>
          <a href="#" className="mx-2 text-white no-underline hover:underline">
            About
          </a>
          <a href="#" className="mx-2 text-white no-underline hover:underline">
            Shop
          </a>
          <a href="#" className="mx-2 text-white no-underline hover:underline">
            Contact
          </a>
        </div>

        {/* Redes sociales */}
        <div className="mb-4 flex justify-center gap-4 text-xl">
          <a href="#" className="hover:text-gray-200">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaInstagram />
          </a>
        </div>

        {/* Footer info */}
        <p className="text-sm">sjdfkhkasdfsdfasdfasdf</p>
      </div>
    </footer>
  );
};
