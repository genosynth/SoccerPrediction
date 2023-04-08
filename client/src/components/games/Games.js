import React, {useState, useEffect} from 'react'
import axios from "axios"


function Games({userData}) {

 
  const [userGameData, setUserGameData] = useState(JSON.parse(localStorage.getItem("soccer-user")))
  const [games, setGames] = useState([])
  const [homePrediction, setHomePrediction] = useState("")
  const [awayPrediction, setAwayPrediction] = useState("")

  

  const updateHomePrediction = (event) => {
    event.preventDefault()
    setHomePrediction(event.target.value)
  }

  const updateAwayPrediction = (event) => {
    event.preventDefault()
    setAwayPrediction(event.target.value)
  }


    const predict = (gameId)=>{
      
      let conf = window.confirm("Confirm Prediction?")
      if(!conf){
        return 
      }
        let username = userData.username
        let prediction = `${homePrediction}-${awayPrediction}`
       
        axios.post(process.env.REACT_APP_SERVER_ADD_PREDICTION_URL, {username, prediction, gameId} ) // request is made to an url which is found in the .env file
      
        .then(res => {
          //console.log(res)
          //window.confirm("ok?")
          if (!res.data){
          
          return alert("Unsuccessful, please try again.")  
          
         }
    
         else  {
          alert("Prediction added.") 
          
          //the below part of the code is done to make sure the front end is updated with the latest user prediction to fix any latencies when refreshing
          
          axios.post(process.env.REACT_APP_SERVER_GET_USER_DATA_URL, {username})
          .then(res => {
            if (!res.data){
              return alert("No data could be found")
            }

            else {
              //console.log(res.data)
              setUserGameData(res.data.predictions)
              localStorage.setItem("soccer-user",JSON.stringify(res.data.predictions))
              //alert("Refresh")
              window.location.reload()

            }
          })
     

          return 
         } 
          
        })

     

    }

    useEffect(()=>{
    
      axios.get(process.env.REACT_APP_GET_GAMES ) 
      .then(res => {
       if (!res.data){
        
        return setGames("No Games To Predict")
       }
  
       else {
        let temp = res.data
        //console.log(temp)
        //console.log(userGameData)
        
        const result = temp.filter((game) => {
          for (let i=0; i<userGameData.length; i++){
  
            if (game.gameId==userGameData[i].gameId){
              console.log(game.gameId)
              
              return 
            }
          }      
  
            //console.log(userGameData[4].gameId)
            //console.log(temp[0].gameId)
            return game
        });
  
        
         setGames(result)    
         console.log(games)
        
              
       }
      })
    },[])

    
   

  return (
    games.map((el)=>{
        return (
            <form key={el.gameId} onSubmit={(event)=>{event.preventDefault(); predict(el.gameId)}}>
            <div>{el.homeTeam}  <input type="number" required onChange={updateHomePrediction}/>  - <input type="number" required onChange={updateAwayPrediction}/> {el.awayTeam} </div>
            <button type="submit"> Save </button>
            </form>
            
        )
    })
  )
}

export default Games