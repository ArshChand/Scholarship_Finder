import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MyScholarships = () => {
  const { token , loading } = useAuth();
  const [scholarships, setScholarships] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!token) {
        console.warn('No token found, skipping scholarship fetch.');
        setFetching(false);
        return;
    }
    const fetchMyScholarships = async () => {
      try {
        const res = await axios.get('https://scholarship-finder-xtg6.onrender.com/api/scholarships/mysch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setScholarships(res.data);
      } catch (err) {
        console.error('Failed to fetch scholarships', err);
      } finally {
         setFetching(false);
      }
    };

    fetchMyScholarships();
  }, [token,loading]);

  if (loading||fetching) return <p>Loading your scholarships...</p>;

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
              Req. GPA: {scholarship.gpa} <br />
              Amount: {scholarship.amount} <br />
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
