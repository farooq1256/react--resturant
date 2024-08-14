// src/components/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useAppContext } from './AppContext';

const Cart = () => {
  const { cart, setCart } = useAppContext();
  const { state } = useAuth(); // Get authentication state
  const navigate = useNavigate();

  const updateCart = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="cart-container p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="overflow-auto max-h-80">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2 border border-gray-300 text-left">Product</th>
                  <th className="py-2 border border-gray-300 text-left">Title</th>
                  <th className="py-2 border border-gray-300 text-left">Price</th>
                  <th className="py-2 border border-gray-300 text-left">Quantity</th>
                  <th className="py-2 border border-gray-300 text-left">Total</th>
                  <th className="py-2 border border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="hover:bg-gray-100 border-b-2 border-gray-300">
                    <td className="py-2 border border-gray-300">
                      <img src={item.image} alt={item.title} className="w-12" />
                    </td>
                    <td className="py-2 border border-gray-300">{item.title}</td>
                    <td className="py-2 border border-gray-300">${item.price}</td>
                    <td className="py-2 border border-gray-300">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateCart(item.id, parseInt(e.target.value))}
                        min="1"
                        className="border rounded p-1 w-16"
                      />
                    </td>
                    <td className="py-2 border border-gray-300">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="py-2 border border-gray-300">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
          </div>
          <div className="text-center">
            {state.isAuthenticated ? (
              <button
                onClick={() => navigate('/checkorder')}
                className="mt-4 w-60 bg-pink-600 text-white py-2 rounded hover:bg-green-600 transition duration-200"
              >
                Check Order
              </button>
            ) : (
              <div>
                <p>Please log in to proceed with checkout orders</p>
                <button
                  onClick={handleLoginRedirect}
                  className="mt-4 w-60 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                >
                 Please Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
