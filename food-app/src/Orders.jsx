import React from 'react';

const Orders = () => {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  return (
    <div className="orders-container p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-6xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6 overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center text-gray-500">No orders found.</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{order.name}</td>
                    <td className="py-3 px-6 text-left">{order.address}</td>
                    <td className="py-3 px-6 text-left">
                      {order.products.map((product) => (
                        <div key={product.id}>
                          {product.title} (x{product.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-left">${order.amount.toFixed(2)}</td>
                    <td className="py-3 px-6 text-left">{order.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
