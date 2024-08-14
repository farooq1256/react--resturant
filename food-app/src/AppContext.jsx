import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  // Load products and cart from localStorage on initial render
  useEffect(() => {
    try {
      // console.log('Loading data from localStorage...');
      const savedProducts = localStorage.getItem('products');
      const savedCart = localStorage.getItem('cart');

      if (savedProducts) {
        // console.log('Products found in localStorage:', savedProducts);
        setProducts(JSON.parse(savedProducts));
      } else {
        // console.log('No products found in localStorage.');
      }

      if (savedCart) {
        // console.log('Cart found in localStorage:', savedCart);
        setCart(JSON.parse(savedCart));
      } else {
        // console.log('No cart found in localStorage.');
      }
    } catch (err) {
      // console.error('Error loading data from localStorage:', err);
      setError('Error loading data from localStorage.');
    }
  }, []);

  // Save products to localStorage whenever it changes
  useEffect(() => {
    if (products.length > 0) {
      try {
        // console.log('Saving products to localStorage:', products);
        localStorage.setItem('products', JSON.stringify(products));
      } catch (err) {
        // console.error('Error saving products to localStorage:', err);
        setError('Error saving products to localStorage.');
      }
    }
  }, [products]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      // console.log('Saving cart to localStorage:', cart);
      if (cart.length === 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (err) {
      // console.error('Error saving cart to localStorage:', err);
      setError('Error saving cart to localStorage.');
    }
  }, [cart]);

  return (
    <AppContext.Provider value={{ products, setProducts, cart, setCart, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
