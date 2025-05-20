import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Signup.css';
import { useAuth } from '../context/AuthContext';



const CompleteProfile = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [gpa, setGpa] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [incomeStatus, setIncomeStatus] = useState('');
  const [specialCategory, setSpecialCategory] = useState('');
  const [error, setError] = useState('');

  const locationOptions = [
    "Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas",
    "Armed Forces Americas", "Armed Forces Europe", "Armed Forces Pacific",
    "California", "Colorado", "Connecticut", "Delaware",
    "Federated States of Micronesia", "Florida", "Georgia", "Guam",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Puerto Rico", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virgin Islands, U.S.", "Virginia",
    "Washington", "Washington DC", "West Virginia", "Wisconsin", "Wyoming"
  ];

  useEffect(() => {
    const email = localStorage.getItem('signupEmail');
    if (!email) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!location || !gpa || !courseOfStudy) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location, gpa, courseOfStudy, incomeStatus, specialCategory }),
      });

        const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('signupEmail');
        login(token); // reinitialize context if needed
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
          <label>Course of Study</label>
          <select value={courseOfStudy} onChange={(e) => setCourseOfStudy(e.target.value)} required>
            <option value="">Select course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
            <option value="MBA">MBA</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div className="form-group">
          <label>GPA (out of 10)</label>
          <select value={gpa} onChange={(e) => setGpa(e.target.value)} required>
            <option value="">Select GPA range</option>
            <option value="3.6-4">3.6-4</option>
            <option value="3.1-3.5">3.1-3.5</option>
            <option value="2.6-3">2.6-3</option>
            <option value="2.1-2.5">2.1-2.5</option>
            <option value="1.6-2">1.6-2</option>
            <option value="1-1.5">1-1.5</option>
            <option value="Below 1">Below 1</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select your location</option>
            {locationOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label>Income Status (optional)</label>
          <select value={incomeStatus} onChange={(e) => setIncomeStatus(e.target.value)}>
            <option value="">Select income status</option>
            <option value="Low">Low</option>
            <option value="Middle">Middle</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Special Category (optional)</label>
          <select value={specialCategory} onChange={(e) => setSpecialCategory(e.target.value)}>
            <option value="">None</option>
            <option value="SC/ST">SC/ST</option>
            <option value="OBC">OBC</option>
            <option value="PWD">Person with Disability (PWD)</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn">Submit</button>
      </form>
    </div>
  );
};

export default CompleteProfile;



  

    

      

  