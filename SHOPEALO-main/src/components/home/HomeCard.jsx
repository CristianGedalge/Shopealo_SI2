import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/axios";
/* Puedes reemplazar la imagen de ejemplo por tu src={...} real.

El efecto de hover:scale-[1.02] reemplaza la transición que tenías en CSS. */
export const HomeCard = ({product}) => {
  return (
    <div className="mb-4">
      <Link
        to={`products/${product.slug}`}
        className="block no-underline w-full rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02] cursor-pointer bg-white"
      >
        {/* Imagen */}
        <div className="w-full h-52 overflow-hidden">
          <img
            /* src="https://via.placeholder.com/300x200" */
            src={`${BASE_URL}${product.image}`}
            alt="Imagen del producto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto */}
        <div className="text-center p-2">
          <h5 className="text-base font-semibold text-black mb-1">
            {product.name}
          </h5>
          <h6 className="text-sm text-black">{`${product.price} BS`}</h6>
        </div>
      </Link>
    </div>
  );
};
