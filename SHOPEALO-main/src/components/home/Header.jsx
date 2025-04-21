import React from "react";

export const Header = () => {
  return (
    <header className="py-16 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ¡Bienvenido a tu tienda favorita!
        </h1>
        <p className="text-lg font-normal text-white/75 mb-6">
          Descubre las últimas tendencias con nuestra colección moderna
        </p>
        <a
          href="#shop"
          className="bg-white text-indigo-600 text-lg font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Comprar ahora
        </a>
      </div>
    </header>
  );
};
