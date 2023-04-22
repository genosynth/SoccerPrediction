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

 const add = async (gameId,home,away) =>{
    let result = `${home}-${away}`

    const delay = ms => new Promise(res => setTimeout(res, ms));//  used to delay before checkign winner
    

    axios.post(process.env.REACT_APP_SERVER_ADD_RESULT_URL, {gameId,result} )
    .then(res => {
        if (!res.data){
        
        window.confirm("Unsuccessful, please try again.")  
        
       }
  
       else {
        alert("Result added.")
        //window.confirm("")
        //return //window.reload()
       } 
        
      })    
      
      await delay(2000);
       
      checkWinners(gameId)
      window.location.reload()   

     


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



  const checkWinners = (gameId) =>{
    axios.post(process.env.REACT_APP_SERVER_CHECK_WINNERS_URL, {gameId})
    .then(res => {
      if (!res.data){
        window.confirm("Unsuccessful, please try again.")  

      }

      else {
        return alert("Winners Checked")
      }
    })

  }

  
  if (!games) {
    return <div>No games to add results for.</div>
  }
    
 return (
    games.map((el)=>{
        return (
            <form className='add-result' key={el.gameId} onSubmit={(event)=>{event.preventDefault()
            add(el.gameId,homeResult,awayResult)            
          
            }}>
            <div>{el.homeTeam}  <input type="number" required onChange={updateHomeResult}/>  - <input type="number" required onChange={updateAwayResult}/> {el.awayTeam} </div>
            <button type="submit"> Add Result </button>
            </form>
            
        )
    })
  )
}

export default AddResult