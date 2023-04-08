import React, {useState} from 'react'

function Prediction({el}) {

    if(!el)return
  return (
    <div key={el.gameId}>{el.homeTeam} {el.prediction} {el.awayTeam}</div>
  )
}

export default Prediction