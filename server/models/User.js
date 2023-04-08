const mongoose = require("mongoose");


const prediction = new mongoose.Schema({

    gameId:{
        type:String,       
        required: true
    },

    homeTeam: {
        type:String,
        required:true
    },

    awayTeam: {
        type:String,
        required: true
    },

    prediction: {
        type:String,
        required:true
    },

    predicted:{
        type:Boolean
    },

    predictedScore:{
      type:Boolean
    }

})


const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true,
  },

  dateRegistered: {
    type: Date,
    default: Date.now(),
  },

  predictions: [prediction],

  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("users", user);
