import React from 'react'

export const PaymenSection = () => {
  return (
    <>
 <div className="w-full md:w-1/3">
      <div className="rounded-lg shadow bg-white">
        <div
          className="rounded-t-lg px-4 py-3"
          style={{ backgroundColor: '#6050DC', color: 'white' }}
        >
          <h5 className="text-lg font-semibold">Payment Options</h5>
        </div>

        <div className="p-4">
          {/* PayPal Button */}
          <button
            className="flex items-center justify-center w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            id="paypal-button"
          >
            <i className="bi bi-paypal mr-2"></i>
            Pay with PayPal
          </button>

          {/* Flutterwave Button */}
          <button
            className="flex items-center justify-center w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            id="flutterwave-button"
          >
            <i className="bi bi-credit-card mr-2"></i>
            Pay with Flutterwave
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
