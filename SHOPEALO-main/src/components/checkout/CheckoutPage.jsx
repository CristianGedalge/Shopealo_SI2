import React from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymenSection } from "./PaymenSection";
import useCartData from "../hooks/useCartDAta";

export const CheckoutPage = () => {
    const {cartitems,setCartItems, setCartTotal,cartTotal,loading,tax} = useCartData

  return (
    <>
      <div className="container mx-auto my-6 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <OrderSummary cartitems={cartitems}   cartTotal={cartTotal} tax={tax}/>
          <PaymenSection />
        </div>
      </div>
    </>
  );
};
