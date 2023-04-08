const mongoose = require("mongoose");


const game = new mongoose.Schema({

    gameId:{
        unique: true,
        type:String,
        //default: short.uuid()
    },

    homeTeam: {
        type:String,
        required:true
    },

    awayTeam: {
        type:String,
        required: true
    },

    result: {
        type:String,
        //default:"N/A"
    },

    finished:{
        type:Boolean
    }

  

})



module.exports = mongoose.model("games", game);
