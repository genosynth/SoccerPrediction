import React, {useState,useEffect} from 'react';
import axios from "axios"


function AddResult() {

 const [games, setGames] = useState(false)
 const [homeResult, setHomeResult] = useState('')
 const [awayResult, setAwayResult] = useState('')


 const updateHomeResult = (event) => {
    event.preventDefault()
    setHomeResult(event.target.value)
  }

  const updateAwayResult = (event) => {
    event.preventDefault()
    setAwayResult(event.target.value)
  }

 const add = (gameId,home,away) =>{
    let result = `${home}-${away}`

    

    axios.post(process.env.REACT_APP_SERVER_ADD_RESULT_URL, {gameId,result} )
    .then(res => {
        if (!res.data){
        
        window.confirm("Unsuccessful, please try again.")  
        
       }
  
       else {
        alert("Result added.")
        window.confirm("")
        return //window.reload()
       } 
        
      })
 }

 useEffect(()=>{

    //console.log(process.env)
    
    axios.get(process.env.REACT_APP_GET_GAMES) 
    .then(res => {
     if (!res.data){
      
      return setGames("No Results Yet")
     }

     else return setGames(res.data)      
      
    })
  },[])

  if (!games) {
    return <div>No games to add results for.</div>
  }
    
 return (
    games.map((el)=>{
        return (
            <form key={el.gameId} onSubmit={()=>{add(el.gameId,homeResult,awayResult)}}>
            <div>{el.homeTeam}  <input type="number" required onChange={updateHomeResult}/>  - <input type="number" required onChange={updateAwayResult}/> {el.awayTeam} </div>
            <button type="submit"> Add Result </button>
            </form>
            
        )
    })
  )
}

export default AddResult