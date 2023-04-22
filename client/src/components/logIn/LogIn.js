import React, {useState} from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'


function LogIn() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const updateUsername = (event) => {
    setUsername(event.target.value);
  }

  const updatePassword = (event) => {
    setPassword(event.target.value);
  }

  const log = (event) =>{
    event.preventDefault()
    
    let user = {username,password}
    axios.post(process.env.REACT_APP_SERVER_LOG_URL,  user ) //post request is made to an url which is found in the .env file
    .then(res => {
     
      if (!res.data.user){
        return window.alert("Incorrect username and/or password")
      }

      let decoded = jwt(res.data.user)

      console.log(decoded)
     

      window.alert(`Hi ${decoded.username}, you are logged in.`)
      localStorage.setItem("soccer", JSON.stringify(decoded))
      //console.log(res);
      //console.log(res.data);
      window.location.href = "/"
    
      
    })

    
}
  

  return (
    <div className='login'>
    <h1>Log In</h1>
    <form onSubmit={log}>
      <label>Username</label>
      <input type="text" required onChange={updateUsername}></input>
      <label>Password</label>
      <input type="password" required onChange={updatePassword}></input>      
      <button type='submit'>Log In</button>
      <span><a href="/register">Click here to register.</a></span>
    </form>
   
</div>
  )
}

export default LogIn