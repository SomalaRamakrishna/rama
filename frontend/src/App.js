import React from 'react';
import Home from './Home'
import Login from './Login';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Register';
import Dashboard from './Dashboard';
import Myprofile from './Myprofile';
import IndividualProfile from './IndividualProfile';

const App=()=>{
  return (
    <div>
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/register" element={<Register/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/myprofile" element={<Myprofile/>}/>
         <Route path="/indivprofile/:fullname/:email/:skill/:id" element={<IndividualProfile/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
    
  )
}

export default App;
