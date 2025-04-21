import React, { useEffect, useState } from "react";
import { CartSummary } from "./CartSummary";
import { CartItem } from "./CartItem";
import api from "../../api/axios";
import { FaSleigh } from "react-icons/fa6";
import Spinner from "../ui/Spinner";
import useCartData from '../hooks/useCartDAta'
export const CartPage = ({   setNumberCartItems}) => {


  const { cartitems, setCartItems, cartTotal, setCartTotal, loading, tax, refreshCart } = useCartData();

 // const {cartitems,setCartItems,cartTotal, setCartTotal,loading,tax} = useCartData()
  /* const cart_code = localStorage.getItem("cart_code");
  const [cartitems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.00);
  const tax = 2.00;
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api
      .get(`get_cart?cart_code=${cart_code}`)
      .then((res) => {
        console.log(res.data);
        cartitems={cartitems}
        setLoading(FaSleigh)
        setCartItems(res.data.items);
        setCartTotal(res.data.sum_total);
        setNumberCartItems={setNumberCartItems}
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []); */
if(loading){
  return  <Spinner loading={loading}/>
}
  if (cartitems.length < 1) {
    return (
      <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded" role="alert">
        You haven't added any item to your cart.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 h-[80vh] overflow-y-scroll">
      <h5 className="text-xl font-semibold mb-6">Shopping Cart</h5>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-4">
          {cartitems.map(item =><CartItem 
  key={item.id} 
  item={item} 
  cartitems={cartitems} 
  setCartItems={setCartItems} 
  setCartTotal={setCartTotal} 
  setNumberCartItems={setNumberCartItems} refreshCart={refreshCart}
/>
 )}
        </div>
        <div className="md:col-span-4">
          <CartSummary cartTotal={cartTotal} tax={tax} />
        </div>
      </div>
    </div>
  );
};
