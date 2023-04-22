import React, {useState,useEffect} from 'react'
import Result from './Result'


function Results({results}) {




    return (
        results.map((el)=>{      
          
       
            return (

                <Result key={el.gameId} el={el} ></Result>
                
            )
        })
      )
}

export default Results