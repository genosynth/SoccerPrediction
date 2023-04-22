import axios from "axios"
import React, {useState,useEffect} from 'react'

function Result({el}) {

    const [prediction,setPrediction] = useState("No Prediction")
    const [otherPred,setOtherPred] = useState("No Prediction")
    const [style, setStyle] = useState({color:"red"})

    useEffect(()=>{
        let username= JSON.parse(localStorage.getItem("soccer")).username
        axios.post(process.env.REACT_APP_SERVER_GET_SINGLE_PREDICTION_URL, {username:username, gameId:el.gameId})
        .then(res => {
         if (!res.data){
          
          return setPrediction("No Valid User Data")
         }
    
         else {
          setOtherPred(res.data[0].predicted)
          return setPrediction(res.data[0].prediction)      
         }
        })

        
    },[])
    

    useEffect(()=>{

      if (prediction==el.result){
        return setStyle({color:"green"})
       }

       if (otherPred===true){
        return setStyle({color:"yellow"})
       }

    }, [prediction])


  
    
    

  return (
    <div style={style} key={el.gameId}>{el.homeTeam} {el.result} {el.awayTeam} - {prediction} </div>
  )
}

export default Result