import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <header className="py-8 my-10 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 my-10">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">
            ¡Página no encontrada!
          </h1>
          <p className="text-lg font-normal text-white/75 mb-6">
            La página que estás buscando no existe.
          </p>
          <Link
            to="/"
            className="bg-white text-indigo-600 text-lg rounded-full px-6 py-2 font-semibold hover:bg-gray-100 transition"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    </header>
  );
};
