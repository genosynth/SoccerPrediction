import React, {useState, useEffect} from 'react'
import axios from "axios"
import Games from "../games/Games"
import Results from "../games/Results"
import Predictions from "../predictions/Predictions"
import Table from "../table/Table"

function Profile() {

  
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("soccer")))
  const [results, setResults] = useState([])
 
 


  useEffect(()=>{

    //console.log(process.env)
    
    axios.get(process.env.REACT_APP_SERVER_GET_RESULTS_URL) 
    .then(res => {
     if (!res.data){
      
      return setResults("No Results Yet")
     }

     else return setResults(res.data)      
      
    })
  },[])

  useEffect(()=>{
    
    let username= JSON.parse(localStorage.getItem("soccer")).username

    axios.post(process.env.REACT_APP_SERVER_GET_USER_DATA_URL, {username})
    .then(res => {
     if (!res.data){
      
     
      return setUserData("No Valid User Data")
     }

     else {
      localStorage.setItem("soccer-user",JSON.stringify(res.data.predictions))
      console.log(res.data)
      return setUserData(res.data)      
     
     }
    })
  },[])



  

  return (
    <div>
      <h1>{userData.username}</h1>
        <section>
          <h2>Games To Predict</h2>
          <Games userData={userData}></Games>       
        </section>

        <section>
          <h2>Predictions</h2>          
          <Predictions results={results}></Predictions>
          <h2>Results</h2>
          <Results results={results} ></Results>
        </section>

        <section>
          <h2>Table</h2>
          <Table></Table>
        </section>
      </div>
  )
}

export default Profile