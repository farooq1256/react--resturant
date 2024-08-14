import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 
import Home from './Home'; 
import Dashbord from './Dashbord';
import Cart from './Cart'; 
import Login from './Login'; 
import Register from './Register'; 
import Menu from './Menu';
import CheckOrder from './CheckOrder'; 
import Orders from './Orders'; 
import { AuthProvider, useAuth } from './AuthContext';
import { AppProvider } from './AppContext'; 
import PrivateRoute from './PrivateRoute'; 
import Loader from './Loader'; // Import Loader

const App = () => {
  const location = useLocation();
  const { state } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial loading period
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust this timeout as needed
  }, []);

  const shouldShowNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          {shouldShowNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashbord" element={<Dashbord />} />
              <Route path="/checkorder" element={<CheckOrder />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
    </>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </AuthProvider>
);

export default AppWrapper;
