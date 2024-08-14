import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContext } from './AppContext';
import './background.css';

const CheckOrder = () => {
  const { cart, setCart } = useAppContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();

    const order = {
      name,
      address,
      products: cart,
      amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    toast.success('Order placed successfully!');
    setCart([]);
    navigate('/orders');
  };

  return (
    <div className="check-order-container p-6 backgood min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Check Order</h1>
        <form onSubmit={handleOrder} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded p-2 w-full transition duration-200 ease-in-out focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="User Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="border rounded p-2 w-full transition duration-200 ease-in-out focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-green-400 transition duration-200 ease-in-out"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOrder;
