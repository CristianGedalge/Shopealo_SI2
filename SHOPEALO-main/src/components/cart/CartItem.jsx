import React, { useState } from "react";
import { BASE_URL } from "../../api/axios";
import api from "../../api/axios";
import { toast } from "react-toastify";

export const CartItem = ({ 
  item, 
  cartitems, 
  setCartItems, 
  setCartTotal, 
  setNumberCartItems ,
  refreshCart
}) => {  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(false);

  const updateCartItem = async () => {
    const quantityParsed = parseInt(quantity);

    // ✅ Validación previa
    if (isNaN(quantityParsed) || quantityParsed <= 0) {
      toast.error("La cantidad debe ser mayor a 0");
      return;
    }

    try {
      setUpdating(true);
      const itemData = {
        quantity: quantityParsed,
        item_id: item.id,
      };

       await api.patch("update_quantity/", itemData);
      await refreshCart();
      
      // ✅ Actualizar estado local del carrito
      const updatedItems = cartitems.map((cartitem) =>
        cartitem.id === item.id
          ? { ...cartitem, quantity: quantityParsed, total: quantityParsed * cartitem.product.price }
          : cartitem
      );

      setCartItems(updatedItems);
      setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0));
      setNumberCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0));
      toast.success("¡Item actualizado correctamente!");

    } catch (err) {
      console.error(err.message);
      toast.error("Error al actualizar la cantidad");
    } finally {
      setUpdating(false);
    }
  };

  const deleteCartitem = async () => {
    if (removing) return;
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto del carrito?");
    if (!confirmDelete) return;

    try {
      setRemoving(true);
      await api.post("delete_cartitem/", { item_id: item.id });
      await refreshCart();
      

      const updatedItems = cartitems.filter(cartitem => cartitem.id !== item.id);
      setCartItems(updatedItems);
      setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0));
      setNumberCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0));
      toast.success("Producto eliminado del carrito");

    } catch (err) {
      console.error(err.message);
      toast.error("Error al eliminar producto");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4 p-4 bg-gray-100 rounded-lg shadow-sm transition-all duration-300">
        <img src={`${BASE_URL}${item.product.image}`} alt="Product" className="w-20 h-20 object-cover rounded-md" />

        <div className="flex-1">
          <h5 className="text-lg font-semibold mb-1">{item.product.name}</h5>
          <p className="text-gray-500 text-sm">{`${item.product.price} Bs`}</p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            onClick={updateCartItem}
            className={`px-3 py-1 text-white text-sm rounded ${updating ? "bg-green-400" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {updating ? "✔️" : "Actualizar"}
          </button>

          <button
            onClick={deleteCartitem}
            className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 text-sm rounded"
            disabled={removing}
          >
            {removing ? "..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};
