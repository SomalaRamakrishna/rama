import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allprofiles',{
          headers:{
            'x-token':localStorage.getItem('token')
          }
        })
        setData(response.data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);
  if(!localStorage.getItem('token'))
  {
    return <Navigate to="/login"/>
  }

  return (
    <div>
      <h1>Developers</h1>
      <p>Browse and connect with developers</p>
       <ul>
        <li><Link to="/myprofile">Myprofile</Link></li>
        <li><Link to="/login" onClick={()=> localStorage.removeItem('token')}>Logout</Link></li>
       </ul>
       {data.length>=1 ? data.map((developer) => (
        <div key={developer._id} className="developer-card">
          <img src="https://via.placeholder.com/150" alt="Developer Avatar" />
          <h3>{developer.fullname}</h3>
          <p>{developer.email}</p>
          <p>{developer.mobile}</p>
          <p>Skills: {developer.skill}</p>
          <Link to={`/indivprofile/${developer.fullname}/${developer.email}/${developer.skill}/${developer._id}`} >View Profile</Link>
        </div>
      )) :null      }
      
    </div>
  );
};

export default Dashboard;