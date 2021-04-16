const express = require("express")
const route = express.Router();
const Trains = require("../models/trains");


//Get all Train Details
route.get("/getAll", (req, res) => {

    Trains.find({}, (err, trains) => {

        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(trains)
        }
    });
});


//Searching Trains
route.post("/trainSearch", (req, res) => {

    const query = { "destination.name": new RegExp(req.body.departure, "i"), "destination.name": new RegExp(req.body.destination, "i") }

    Trains.find(query, (err, trains) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(trains);
        }
    });
});


module.exports = route;