import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email.trim().toLowerCase());

    if (user) {
      dispatch({ type: 'FORGOT_PASSWORD' });
      toast.success(`Your password is: ${user.password}`, { position: 'top-center' });
    } else {
      toast.error('Email not found.', { position: 'top-center' });
    }
  };

  return (
    <div className="background">
      <div className="container flex justify-center items-center min-h-screen">
        <div className="form-container animated-container p-6 bg-white shadow-md rounded-md text-center">
          <h2 className="text-2xl font-bold mb-6">Forget Password</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </div>
            <div className="text-center">
              <Button type="primary" htmlType="submit" block size="large">
                Submit
              </Button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
