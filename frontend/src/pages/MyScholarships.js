import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyScholarships = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust if you're storing token differently

        const res = await axios.get('/api/scholarships/my-scholarships', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setScholarships(res.data);
      } catch (err) {
        console.error('Failed to fetch scholarships', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyScholarships();
  }, []);

  if (loading) return <p>Loading your scholarships...</p>;

  return (
    <div>
      <h2>My Scholarships</h2>
      {scholarships.length === 0 ? (
        <p>No matching scholarships found for your profile.</p>
      ) : (
        <ul>
          {scholarships.map((scholarship) => (
            <li key={scholarship._id}>
              <strong>{scholarship.title}</strong> <br />
              Deadline: {scholarship.deadline} <br />
              Location: {scholarship.location}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyScholarships;
