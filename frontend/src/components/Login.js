import React, { useState } from 'react';
import { login } from '../api'; // ✅ use centralized API instance
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(formData); // ✅ uses axios instance with baseURL
      localStorage.setItem('token', res.data.token); // optionally store user info too
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="login-btn" type="submit">Login</button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </form>
      <p>
        Don't have an account?{' '}
        <Link className="login-link" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
