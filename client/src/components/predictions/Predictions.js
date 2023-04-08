import React, {useState,useEffect} from 'react'
import Prediction from './Prediction'
import axios from 'axios'

function Predictions({results}) {

//console.log(results)
  //const [predictions, setPrediction] = useState(userData.predictions)
  const [predictions, setPrediction] = useState(()=>{

    let temp = localStorage.getItem("soccer-user")
    temp = JSON.parse(temp)
 
    
    return (temp)
  })

  useEffect(()=>{
    let mapped = results.map(el=> el.gameId)

    console.log(mapped)
    
  },[])

  


  if (!predictions) 
  return (
      <>No Pending Predictions.</>
  )
  return (
    predictions.map((el)=>{
      
      return (
        <Prediction key={el.gameId} el={el}></Prediction>
      )
    })
  )
}

export default Predictions