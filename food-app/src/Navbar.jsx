import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from './AuthContext';
import { useAppContext } from './AppContext';

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const { cart } = useAppContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user'); 
    navigate('/');
  };
  
  const totalItemsInCart = cart.reduce((total, product) => total + (product.quantity || 1), 0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-slate-400 shadow-md">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 bg-slate-800 px-4">
        <div className="flex justify-center items-center text-lg text-green-700 font-semibold  w-full">
          {state.isAuthenticated ? (
            <>
              <span>Welcome, {state.user.fullName}</span>
              <button
                onClick={handleLogout}
                className="ml-4 text-fuchsia-700  font-semibold text-xl transition duration-300 hover:text-blue-400"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="text-blue-600 font-semibold text-lg transition duration-300 hover:text-zinc-50"
            >
              Create Account
            </NavLink>
          )}
        </div>
        <button className="text-amber-300 text-xl ml-4 lg:hidden" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Sidebar for small devices */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-15 z-50 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
        onClick={toggleSidebar}
      >
        <div className="bg-orange-300 w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
          <button className="text-gray-900 text-xl p-4" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
          <nav className="flex flex-col text-lg p-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-900 transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mb-2`
              }
              onClick={toggleSidebar}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `text-gray-900 transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mb-2`
              }
              onClick={toggleSidebar}
            >
              Menu
            </NavLink>
            {state.isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-gray-900 transition duration-300 ${
                      isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                    } mb-2`
                  }
                  onClick={toggleSidebar}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/checkorder"
                  className={({ isActive }) =>
                    `text-gray-900 transition duration-300 ${
                      isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                    } mb-2`
                  }
                  onClick={toggleSidebar}
                >
                  Check Order
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `text-gray-900 transition duration-300 ${
                      isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                    } mb-2`
                  }
                  onClick={toggleSidebar}
                >
                  Orders
                </NavLink>
              </>
            )}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-gray-900 transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mb-2 flex items-center`
              }
              onClick={toggleSidebar}
            >
              <i className="fas fa-shopping-cart"></i>
              {totalItemsInCart > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-1">
                  {totalItemsInCart}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="hidden lg:flex justify-center items-center bg-slate-400 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white transition duration-300 ${
              isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
            } mx-4`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `text-white transition duration-300 ${
              isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
            } mx-4`
          }
        >
          Menu
        </NavLink>
        {state.isAuthenticated && (
          <>
            <NavLink
              to="/dashbord"
              className={({ isActive }) =>
                `text-white transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mx-4`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/checkorder"
              className={({ isActive }) =>
                `text-white transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mx-4`
              }
            >
              Check Order
            </NavLink>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `text-white transition duration-300 ${
                  isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-900'
                } mx-4`
              }
            >
              Orders
            </NavLink>
          </>
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `text-green transition duration-300 ${
              isActive ? 'underline font-bold text-green-700' : 'hover:text-blue-700'
            } mx-4 flex items-center`
          }
        >
          <i className="fas fa-shopping-cart"></i>
          {totalItemsInCart > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 text-xs ml-1">
              {totalItemsInCart}
            </span>
          )}
        </NavLink>
      </motion.nav>
    </div>
  );
};

export default Navbar;
