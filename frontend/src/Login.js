import React,{useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
//import { Link } from 'react-router-dom';
const Login=()=> {
    const [data,setData]=useState({
        email:'',
        password:''
    })
    const changeHandler =e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = async(e) =>{
        e.preventDefault();
        //console.log(data)
        try {
          const response = await axios.post('http://localhost:5000/login', data);
          console.log(response.data); // Log the successful response
          localStorage.setItem('token',response.data.token)
        } catch (err) {
          console.error('Network error:', err.response); // Log details for debugging
        }
    }
    if(localStorage.getItem('token')){
      return <Navigate to='/dashboard'/>
    }



  return (
    <div>
    <h1>Sign Page</h1>
    <form onSubmit={submitHandler} >
      <input
        type="text"
        placeholder="EmailAddress"
        name="email"
        onChange={changeHandler}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={changeHandler}
      />
      <input type="submit" value="login"/>
    </form>
  </div>
  );
}

export default Login;