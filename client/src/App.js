import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import LogIn from './components/logIn/LogIn'
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import AdminPage from './components/admin/AdminPage';

function App() {

  const [token, setToken] = useState(false)

  useEffect(()=>{
    if (localStorage.getItem("soccer")){
      setToken(JSON.parse(localStorage.getItem("soccer")))
    }
    
  },[])

  if (!token){
    return (
      <div className="App">      
        <Router basename="/">
          <Routes>
            <Route path="/"  element={<LogIn></LogIn>}/>         
            <Route path="/register" element={<Register></Register>}/>         
          </Routes>
       </Router>
      </div>
    );
  }


  if (token.admin){ //admin page available to create games and publish results
    return  (
      <div className="App">     
      <span><a href="/">Home Page</a></span> - 
      <span><a href="/admin"> Admin Page</a> </span>
      <Router basename="/">
        <Routes>
          <Route path="/"  element={<Profile></Profile>}/>    
          <Route path="/admin" element={<AdminPage></AdminPage>}/>                    
        </Routes>
     </Router>
    </div>
    )
  }

  if (token){
    return (
      <div className="App">      
      <Router basename="/">
        <Routes>
          <Route path="/"  element={<Profile></Profile>}/>                        
        </Routes>
     </Router>
    </div>
    )
  }

}

export default App;
