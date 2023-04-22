import React, {useState} from 'react';
import axios from "axios"
import uuid from 'react-uuid';
import AddResult from './AddResult';

function AdminPage() {

    const [homeTeam, setHomeTeam] = useState("")
    const [awayTeam, setAwayTeam] = useState("")
    

    
  const updateHomeTeam = (event) => { // to create game
    event.preventDefault()
    setHomeTeam(event.target.value)
  }

  const updateAwayTeam = (event) => { //to create game
    event.preventDefault()
    setAwayTeam(event.target.value)
    
  }

  const create = (homeTeam,awayTeam) =>{
    //event.preventDefault()
    //console.log(awayTeam)
    let conf = window.confirm("Confirm Game?")
    if(!conf){
      return 
    }
   
       let gameId = uuid()  
      axios.post(process.env.REACT_APP_SERVER_CREATE_GAME_URL, {homeTeam,awayTeam,gameId} ) // request is made to an url which is found in the .env file
      .then(res => {
        if (!res.data){
        
        alert("Unsuccessful, please try again.")  
        
       }
  
       else {
        alert("Game added.")
        //window.confirm("")
        return 
       } 
        
      })

  }



  return (
    <div className='admin-section'>
        <h1>Admin Page</h1>
        <h2>Add Game</h2>
        <form  onSubmit={()=>{create(homeTeam,awayTeam)}}>
            <div><input type="string" placeholder="Home Team" required onChange={updateHomeTeam}/>  - <input type="string" placeholder="Away Team" required onChange={updateAwayTeam}/> </div>
            <button type="submit"> Add Game </button>
        </form>

        <div className='add-result'>
          <h1>Add Results</h1>
          <AddResult></AddResult>
        </div>
        

    </div>
  )
}

export default AdminPage