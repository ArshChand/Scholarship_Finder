// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(formData);  // this now goes to http://localhost:5000/api/auth/signup
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Signup failed. Please try again.'
      );
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
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
          minLength="6"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <button className="signup-btn" type="submit">Sign Up</button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </form>
      <p>
        Already have an account?{' '}
        <Link className="signup-link" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
