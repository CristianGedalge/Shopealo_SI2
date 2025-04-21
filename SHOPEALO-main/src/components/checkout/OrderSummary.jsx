import React from "react";
import { OrderItem } from "./OrderItem";

export const OrderSummary = ({ cartitems, cartTotal, tax }) => {
    const total=(cartTotal + tax ).toFixed(2)
  return (
    <>
      <div className="w-full md:w-2/3 mb-4">
        <div className="rounded-lg shadow bg-white">
          <div
            className="rounded-t-lg px-4 py-3"
            style={{ backgroundColor: "#6050DC", color: "white" }}
          >
            <h5 className="text-lg font-semibold">Cart Summary</h5>
          </div>

          <div className="p-4">
            <div className="px-3" style={{ height: "300px", overflow: "auto" }}>
              {cartitems.map((item) => (
                <OrderItem key={item.id} cartitems={item} />
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-between">
              <h6 className="text-base font-medium">Total</h6>
              <h6 className="text-base font-semibold">{total}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
