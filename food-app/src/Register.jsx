// Register.js
import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './background.css'; // Import the background CSS

const initialstate = { fullName: '', email: '', password: '' };

const Register = () => {
  const [formData, setFormData] = useState(initialstate);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password } = formData;

    if (!fullName || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.email === email)) {
      toast.error('Email is already registered.');
      return;
    }

    const newUser = { fullName, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    dispatch({ type: 'REGISTER', payload: newUser });
    toast.success('Registration successful!');
    navigate('/login'); // Navigate to login page after successful registration
  };

  return (
    <div className="background">
      <div className="container flex justify-center items-center min-h-screen">
        <div className="form-container animated-container p-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                size="large"
              />
            </div>
            <div className="form-group mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                size="large"
              />
            </div>
            <div className="form-group mb-4">
              <Input.Password
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                size="large"
              />
            </div>
            <div className="text-center">
              <Button type="primary" htmlType="submit" block size="large">
                Register
              </Button>
              <p className="mt-4">
                Already have an account? <Link to="/login">Login Now</Link>
              </p>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
