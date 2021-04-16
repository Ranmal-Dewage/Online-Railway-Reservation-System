const mongoose = require("mongoose");

let trainsSchema = mongoose.Schema({
    name: String,
    day: String,
    imgUrl: String,
    departure: { name: String, time: String },
    arrival: { name: String, time: String },
    destination: [{ name: String, price: Number }]
});

const Trains = mongoose.model('Trains', trainsSchema);

module.exports = Trains;