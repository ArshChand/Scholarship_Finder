// src/pages/AllScholarships.js
import React, { useEffect, useState } from 'react';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/scholarships/all')
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching scholarships:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading scholarships...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Scholarships</h1>
      {scholarships.map((scholarship) => (
        <div key={scholarship._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{scholarship.title}</h2>
          <p><strong>Amount:</strong> {scholarship.amount}</p>
          <p><strong>Deadline:</strong> {scholarship.deadline}</p>
          <p><strong>Description:</strong> {scholarship.description}</p>
          <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
        </div>
      ))}
    </div>
  );
};

export default AllScholarships;
