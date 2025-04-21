/* import { useState, useEffect } from 'react';
import api from '../../api/api'
function useCartData(){
    const cart_code = localStorage.getItem("cart_code");
      const [cartitems, setCartItems] = useState([]);
      const [cartTotal, setCartTotal] = useState(0.00);
      const tax = 2.00;
      const [loading, setLoading] = useState(false)
    
      useEffect(() => {
        setLoading(true)
        api
          .get(`get_cart?cart_code=${cart_code}`)
          .then((res) => {
            console.log(res.data);
            cartitems={cartitems}
            setLoading(false)
            setCartItems(res.data.items);
            setCartTotal(res.data.sum_total);
            setNumberCartItems={setNumberCartItems} jjjjjjjnoo
          })
          .catch((err) => {
            console.log(err.message);
            setLoading(false)
          });
      }, [cart_code]);

      return {cartitems,setCartItems,cartTotal,setCartTotal,loading,tax}
} */

      import { useState, useEffect } from 'react';
      import api from '../../api/axios';
      
      function useCartData() {
        const cart_code = localStorage.getItem("cart_code");
        const [cartitems, setCartItems] = useState([]);
        const [cartTotal, setCartTotal] = useState(0.00);
        const [loading, setLoading] = useState(false);
        const tax = 2.00;
      
        const fetchCart = async () => {
          setLoading(true);
          try {
            const res = await api.get(`get_cart?cart_code=${cart_code}`);
            setCartItems(res.data.items);
            setCartTotal(res.data.sum_total);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => {
          if (!cart_code) return;
          fetchCart();
        }, [cart_code]);
      
        return {
          cartitems,
          setCartItems,
          cartTotal,
          setCartTotal,
          loading,
          tax,
          refreshCart: fetchCart, // 👉 para usar cuando agregues productos
        };
      }
      

      

export default useCartData