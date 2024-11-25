import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const IndividualProfile = () => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store any errors encountered
  const [taskProviderDetails, setTaskProviderDetails] = useState(null); // Object to store task provider info
  const [rating, setRating] = useState('');
  const { fullname, skill, email, id } = useParams();

  // Fetch task provider details when component mounts
  useEffect(() => {
    const fetchTaskProviderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/myprofile`, {
          headers: {
            'x-token': localStorage.getItem('token'),
          },
        });
        setTaskProviderDetails(response.data);
      } catch (error) {
        setError(error); // Store error for display
      } finally {
        setIsLoading(false); // Update loading state
      }
    };

    fetchTaskProviderDetails();
  }, []);

  // Handle review submission form
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert('Please enter a rating (out of 5)');
      return; // Prevent unnecessary API call
    }

    try {
      const review = {
        taskprovider: taskProviderDetails?.fullname, // Use taskProviderDetails if fetched
        taskworker: id,
        rating: rating,
      };

      const response = await axios.post(`http://localhost:5000/addreview`, review, {
        headers: {
          'x-token': localStorage.getItem('token'),
        },
      });
      console.log(response.data);
      alert(response.data); // Informative message
    } catch (error) {
      console.error(error); // Log error for debugging
      alert('Error submitting review. Please try again later.'); // User-friendly error message
    } finally {
      setRating(''); // Clear review input after submission (optional)
    }
  };

  // Conditionally render content based on loading/error states
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  return (
    <div>
      <h1>Profile here</h1>
      <h1>{fullname}</h1>
      <h1>{skill}</h1>
      <h1>{email}</h1>
      <h1>India</h1>
      <br />
      <h2>Add a Review</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter your rating (out of 5)"
          name="rating"
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <button type="submit">Add Rating</button>
      </form>
      <Link to="/dashboard">Back to All Profiles</Link>
    </div>
  );
};

export default IndividualProfile;