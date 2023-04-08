const express = require('express')
const router = express.Router()
const game = require("../models/Game")
const userReg = require("../models/User")
//const jwt = require("jsonwebtoken")
//const bcrypt = require("bcryptjs");

router.post('/createGame', (request, response) => {
    console.log(request.body)

    const gameToAdd = new game({
        homeTeam: request.body.homeTeam,       
        awayTeam: request.body.awayTeam,
        gameId: request.body.gameId
         
    })

    gameToAdd.save()
    .then (data => {
        console.log(data)
        response.json(data)
        //console.log(data)
    })
    .catch (error => {
        response.json(error)
        //console.log(error)
    })
})

router.post('/addResult', async(request, response) => {
    
   const gameToAddResultTo = await game.findOne({
      gameId: request.body.gameId, 
      
    })

    if(gameToAddResultTo){

       gameToAddResultTo.result=request.body.result
       gameToAddResultTo.finished=true
       gameToAddResultTo.save()
        return response.json({status: 'ok', message:"result added" })
    } else {return response.json({status:"error", message:"game not found"})}

})

router.post('/checkWinners', async(request,response) => {

    const allUsers = await userReg.find()
    const gameToCheck = await game.findOne({
        gameId: request.body.gameId
    })

    allUsers.forEach((user)=>{
      
        const found = user.predictions.find(element => element.gameId === request.body.gameId);
        if (found){
            if (found.prediction===gameToCheck.result){
                found.predictedScore=true
                found.predicted=true
            } else { 
                found.predictedScore=false
                let x = eval(gameToCheck.result) //here we are converting the score 1-1 for example to become 0 number so we can compare 
                let y = eval(found.prediction)
                console.log(x)
                console.log(y)
                if (x==y){
                     found.predicted=true
                }
                if (x>0 && y>0){
                     found.predicted=true
                }
                if (x<0 && y<0){
                     found.predicted=true
                }

                if (x>y || x<y) { 
                     //found.predicted=false
                }

               
            }
        }
       
        user.save()
       
    })
    
        response.json(allUsers)
 

})

module.exports = router