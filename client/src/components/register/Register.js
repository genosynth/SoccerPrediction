import React, {useState} from 'react'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUsername = event => {
    setUsername(event.target.value);
 };

  const updatePassword = event => {
    setPassword(event.target.value);
 };


 const updateConfirmPassword = event => {
    setConfirmPassword(event.target.value);
 };

 const registration = (event) =>{
  event.preventDefault()

  if (confirmPassword != password){ return window.alert("Passwords do not match!")}
  //console.log(process.env)
  let user = {username, password}
  axios.post(process.env.REACT_APP_SERVER_SIGN_URL,  user )
  .then(res => {
    if (!res.data.username){
      return window.alert("Username already in use!")
    }

    window.alert("User registered")
    //console.log(res);
    //console.log(res.data);
    window.location.href="/"
    
  })
}

  return (
    <div className='register'>
        <h1>Register</h1>
        <form onSubmit={registration}>
          <label>Username</label>
          <input type="text" required onChange={updateUsername}></input>
          <label>Password</label>
          <input type="password" required onChange={updatePassword}></input>
          <label> Confirm Password</label>
          <input type="password" required onChange={updateConfirmPassword}></input>
          <button type='submit'>Register</button>
          <span><a href="/">Already registered? Click here to log in.</a></span>
        </form>
       
    </div>
  )
}

export default Register