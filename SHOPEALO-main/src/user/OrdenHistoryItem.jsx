import React from "react";

export const OrdenHistoryItem = () => {
  return (
    <>
      <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 mb-3">
        <div className="flex flex-wrap md:items-center gap-4">
          {/* Imagen del producto */}
          <div className="w-full md:w-2/12">
            <img
              src="assets/laptop1.jpg"
              alt="Order Item"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          {/* Detalles del producto */}
          <div className="w-full md:w-6/12">
            <h6 className="text-base font-semibold text-gray-800">Product Name</h6>
            <p className="text-sm text-gray-600">Order Date: June 5, 2024</p>
            <p className="text-sm text-gray-600">Order ID: 123456</p>
          </div>

          {/* Cantidad */}
          <div className="w-6/12 md:w-2/12 text-center">
            <h6 className="text-sm text-gray-500">Quantity: 1</h6>
          </div>

          {/* Precio */}
          <div className="w-6/12 md:w-2/12 text-center">
            <h6 className="text-sm text-gray-500">$100.00</h6>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
