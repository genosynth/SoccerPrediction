import React, {useState, useEffect} from 'react'
import axios from "axios"

function Table() {

    const [users,setUsers] = useState(false)
    const [points,setPoints] = useState([])

    
    
    useEffect(()=>{
    
           
        axios.get(process.env.REACT_APP_SERVER_GET_ALL_USERS_URL)
        .then(res => {
         if (!res.data){
          
         
          return setUsers("No Data Found")
         }
    
         else {
        
         return setUsers(res.data)      
         }
        })


      },[])
    
      useEffect(()=>{

        if (!users) return
        let temp = users.map(user => {
            let points =0;
            for (let i=0; i<user.predictions.length; i++){
                if (user.predictions[i].predictedScore===true){
                    points=points+3
                } else if(user.predictions[i].predicted===true){
                    points=points+1
                }
            }

            return {username:user.username, points}
        })

        
        temp.sort((a, b) => (a.points < b.points) ? 1 : -1) // to sort by descending order i.e top points first

        setPoints(temp)
      }, [users])

if (!users) {
    return (
        <div>No users</div>
    )
}
  return (
    points.map(user=>{
        return <ol key={user.dateRegistered}>
           {user.username} - {user.points} Points
        </ol>
    })
  )
}

export default Table