import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Signup.css';
import { useAuth } from '../context/AuthContext';


const CompleteProfile = () => {
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [gpa, setGpa] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    const email = localStorage.getItem('signupEmail');
    if (!email) {
      navigate('/signup'); // fallback if email is missing
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!location || !age || !gpa) {
        setError('Please fill all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/complete-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({location, age, gpa }),
        });

        const data = await response.json();

        if (response.ok) {
        localStorage.removeItem('signupEmail');
        login(token);
        navigate('/');
        } else {
        setError(data.message || 'Profile update failed.');
        }
    } catch (err) {
        console.error('Profile update error:', err);
        setError('Something went wrong. Please try again.');
    }
    };


  return (
    <div className="login-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>GPA</label>
          <input type="number" step="0.01" value={gpa} onChange={(e) => setGpa(e.target.value)} required />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn">Submit</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
