import React from "react";
import { Link } from "react-router-dom";

export const CartSummary = ({cartTotal ,tax}) => {
    const subTotal =cartTotal.toFixed(2)
    const cartTax = tax.toFixed(2)
    const total = (cartTotal+tax)
  return (
    <div className="w-full md:max-w-sm md:ml-auto">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🛒 Cart Summary
        </h2>
        <hr className="mb-4 border-gray-300" />

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Subtotal:</span>
          <span>{`${subTotal}`}</span>
        </div>

        <div className="flex justify-between text-gray-700 mb-2">
          <span>Tax:</span>
          <span>{`${cartTax}`}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
          <span>Total:</span>
          <span>{`${total}`}</span>
        </div>

        <Link to="/checkout" className="block">
          <button className="w-full py-2 px-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition duration-200">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
