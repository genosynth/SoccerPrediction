const express = require('express')
const router = express.Router()
const userReg = require("../models/User")
const game = require("../models/Game")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");




router.post('/sign', async(request, response) => {
    console.log(request.body)
    let hashedPassword = await bcrypt.hash(request.body.password, 8);
    const user = new userReg({
        username: request.body.username,       
        password: hashedPassword
         
    })

    user.save()
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

router.post('/login', async(request, response) => {
    //response.send('send')
   const user = await userReg.findOne({
       username: request.body.username, 
       //password: request.body.password {THIS IS COMMENTED AS PASSWORD IS BEING CHECKED BY HASHING AFTER THIS LINE}
    })

    if(user && await bcrypt.compare(request.body.password, user.password)){

        const token = jwt.sign({
            username:user.username,
            admin:user.admin
            
        }, process.env.JWT_SECRET)
        console.log(user)
        return response.json({status: 'ok', user:token})
    } else {return response.json({status:"error", user:false})}

})

router.post('/addPrediction', async(request, response) => {

    
    const gameToPredict = await game.findOne({
        gameId : request.body.gameId
    })

    const user = await userReg.findOne({
        username:request.body.username
    })

    if ( await gameToPredict && await user){
        let id = gameToPredict.gameId
        let prediction = request.body.prediction
        let homeTeam = gameToPredict.homeTeam
        let awayTeam = gameToPredict.awayTeam

        let objPrediction = {gameId:id, homeTeam, awayTeam, prediction}

        let checkError = user.predictions.filter(el => {
            if (el.gameId===objPrediction.gameId){
                return el
            }
        })

        if (checkError.length>0){
            return response.json("Prediction already made")
        }

        
        user.predictions.push(objPrediction)
        user.save()
        .then (data => {
            //console.log(data)
            response.json(data)
            //console.log(data)
        })
        .catch (error => {
            response.json(error)
            //console.log(error)
        })
    } else {response.json("Game or User not identified")}
})

router.get('/getGamesToPredict', async(request, response)=>{
    const games = await game.find({
        result: null,
        started:false
    })

    //console.log(games)
    return response.json(games)
})

router.post("/getUserData", async(request,response)=>{
    const user = await userReg.findOne({username:request.body.username})
    return response.json(user)

})

router.get("/getResults", async(request,response)=>{
    const finishedGames = await game.find({finished:true})
    response.json(finishedGames)
})

router.post('/getSinglePrediction', async(request,response)=>{//gets the prediction made by a user for a specific game
    const user = await userReg.findOne({username:request.body.username})
    const game = user.predictions.filter((el)=>el.gameId===request.body.gameId)
    response.json(game)

})

router.get('/getAllUsers', async(request,response)=>{
    const users = await userReg.find()
    response.json(users)
})

module.exports = router