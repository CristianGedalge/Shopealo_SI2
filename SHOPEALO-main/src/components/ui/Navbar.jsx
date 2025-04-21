import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { NavBarLink } from "./NavBarLink";
import { motion } from "framer-motion";

export const Navbar = ({numCartItems}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(12); // simulación

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold uppercase text-gray-800">
          Shoppit
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú y carrito (unificados) */}
        <div
          className={`w-full md:flex md:items-center md:justify-end md:static absolute bg-white left-0 top-full px-4 md:px-0 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
           >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            {/* Links de navegación */}
            <NavBarLink />

            {/* Icono carrito con animación */}
            <Link
              to="/cart"
              className="relative mt-4 md:mt-0 bg-gray-900 text-white rounded-full p-2 hover:bg-indigo-700 transition w-fit ml-0"            >
              <motion.div
                key={numCartItems}
                initial={{ scale: 1 }}
                animate={{ scale: [1.1, 1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <FaCartShopping className="text-white text-2xl" />
              </motion.div>

              <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full px-2 py-1 font-semibold">
                {numCartItems}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
