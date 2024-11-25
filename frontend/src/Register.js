import React,{useState} from 'react'

function Register() {  
    const [data,setData]=useState({
        fullname:'',
        email:'',
        mobile:'',
        skill:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler =e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler =e =>{
        e.preventDefault();
        console.log(data)
    }  
  return (
    <div>
      <h1>Create Your Account</h1>
      <form onSubmit={submitHandler} >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="fullname"
            onChange={changeHandler}
            required
            
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={changeHandler}
            required
            
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            onChange={changeHandler}
            required
           
          />
        </div>
        <div>
          <label htmlFor="skill">Skills</label>
          <textarea
            id="skill"
            name="skill"
            placeholder="Please provide skills by separation of commas (,)"
            onChange={changeHandler}
            required
           
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            required
            
          />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="#">Sign In</a></p>
    </div>
    
  )
}

export default Register