import React from 'react'

export const OrderItem = ({cartitems}) => {
  return (
    <>
 <div className="flex justify-between items-center mb-3 p-3">
      <div className="flex items-center">
        <img
          src={`${BASE_URL}${cartitems.product.image}`}
          alt="Product"
          className="w-[60px] h-[60px] object-cover rounded"
        />
        <div className="ml-3">
          <h6 className="text-base mb-0">{cartitems.product.name}</h6>
          <small className="text-gray-600">{`Quantity: ${cartitems.quantity}`}</small>
        </div>
      </div>
      <h6 className="text-base font-semibold">{ `${cartitems.product.price}`}</h6>
    </div>
    </>
  )
}
