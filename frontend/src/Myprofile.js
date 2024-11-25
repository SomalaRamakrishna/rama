import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return <Navigate to="/login" />;
        }

        const [userResponse, reviewResponse] = await Promise.all([
          axios.get('http://localhost:5000/myprofile', {
            headers: {
              'x-token': token,
            },
          }),
          axios.get('http://localhost:5000/myreview', {
            headers: {
              'x-token': token,
            },
          }),
        ]);

        setUserData(userResponse.data);
        setReviews(reviewResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  

  return (
    <div>
      <h1>My Profile</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="user-info">
            <h2>{userData.fullname}</h2>
            <p>{userData.email}</p>
            <p>{userData.mobile}</p>
            <p>Skills: {userData.skill}</p>
          </div>

          <h2>My Reviews</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review._id}>
                  <h4>{review.taskprovider}</h4>
                  <p>{review.rating}/5</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found.</p>
          )}

          <h2>Add a Review</h2>
          <form /* onSubmit={handleReviewSubmit} */>
            <input
              type="text"
              placeholder="Enter your rating (out of 5)"
              value={newReview}
              onChange={handleReviewChange}
            />
            <button type="submit">Add Rating</button>
          </form>

          <button>Back to All Profiles</button>
        </>
      )}
    </div>
  );
};

export default MyProfile;