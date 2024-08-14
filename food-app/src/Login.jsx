// Login.js
import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './background.css'; // Import the background CSS

const Login = () => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      toast.error('Please enter email and password.', { position: 'top-center' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email.trim().toLowerCase() && user.password === password);

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      localStorage.setItem('user', JSON.stringify(user)); // Save user in localStorage
      navigate('/');
    } else {
      toast.error('Invalid email or password.', { position: 'top-center' });
    }
  };

  const handleForgetPassword = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === emailForReset.trim().toLowerCase());

    if (user) {
      toast.success(`Your password is: ${user.password}`, { position: 'top-center' });
    } else {
      toast.error('Email not found.', { position: 'top-center' });
    }

    setIsModalVisible(false);
  };

  return (
    <div className="background">
      <div className="container flex justify-center items-center min-h-screen">
        <div className="form-container animated-container p-6 bg-white shadow-md rounded-md">
          <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <Input
                type="email"
                name="email"
                value={login.email}
                onChange={handleChange}
                placeholder="Email Address"
                size="large"
              />
            </div>
            <div className="form-group mb-4">
              <Input.Password
                name="password"
                value={login.password}
                onChange={handleChange}
                placeholder="Password"
                size="large"
              />
            </div>
            <div className="text-center mb-4">
              <Button type="link" onClick={() => setIsModalVisible(true)}>
                Forgot Password?
              </Button>
            </div>
            <div className="text-center">
              <Button type="primary" htmlType="submit" block size="large">
                Login
              </Button>
              <p className="mt-4">
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
            </div>
          </form>
          <ToastContainer />
          <Modal
            title="Forgot Password"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleForgetPassword}>
                Submit
              </Button>
            ]}
          >
            <div className="form-group mb-4">
              <Input
                type="email"
                name="emailForReset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Email Address"
                size="large"
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Login;
