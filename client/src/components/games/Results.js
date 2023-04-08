import React, {useState,useEffect} from 'react'
import Result from './Result'


function Results({results,userData}) {




    return (
        results.map((el)=>{      
          
       
            return (

                <Result key={el.gameId} el={el} userData={userData}></Result>
                
            )
        })
      )
}

export default Results