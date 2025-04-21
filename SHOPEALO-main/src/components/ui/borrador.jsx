import React from "react";

export const borrador = () => {
  return (
    <div>
      <li>
        <Link
          className="text-gray-800 hover:text-blue-600 font-semibold transition duration-200"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-800 hover:text-blue-600 font-semibold transition duration-200"
          to="/profile"
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-800 hover:text-blue-600 font-semibold transition duration-200"
          to="/about"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-800 hover:text-blue-600 font-semibold transition duration-200"
          to="/contact"
        >
          Contact
        </Link>
      </li>
    </div>
  );
};
