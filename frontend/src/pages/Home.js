import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [scholarships, setScholarships] = useState([]);
  const [showRecommended, setShowRecommended] = useState(true);

  useEffect(() => {
    // Replace with API call
    const mockScholarships = [
      {
        id: 1,
        title: 'NMF General Scholarships',
        deadline: '2025-05-18',
        amount: '$25,000',
        description: 'National Medical Fellowships…'
      },
      {
        id: 2,
        title: 'USTA Foundation Scholarships',
        deadline: '2025-05-19',
        amount: '$80,000',
        description: 'USTA Foundation awards…'
      }
    ];

    setScholarships(mockScholarships);
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Recommended Scholarships</h2>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={showRecommended}
            onChange={() => setShowRecommended(!showRecommended)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="filters">
        <button>STEM</button>
        <button>Arts</button>
        <button>Need-Based</button>
        <button>Merit-Based</button>
      </div>

      <div className="scholarship-list">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="scholarship-card">
            <h3>{scholarship.title}</h3>
            <p><strong>Amount:</strong> {scholarship.amount}</p>
            <p><strong>Deadline:</strong> {scholarship.deadline}</p>
            <p>{scholarship.description}</p>
          </div>
        ))}
      </div>

      <div className="view-all">
        <a href="/all">→ View All Scholarships</a>
      </div>
    </div>
  );
}

export default Home;
