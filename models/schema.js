
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({

 name: String,
 category:String,
 status: String,
 glycemicIndex: Number,
 bestTime: [String],
 benefits: String,
 image: String

});

module.exports = mongoose.model("Food", FoodSchema);