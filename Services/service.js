const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const trainsRoute = require("./routes/trains");
const mobilesRoute = require("./routes/mobiles");


// DB Connection
mongoose.connect("mongodb://localhost:27017/RailwayReservation", { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Navigate to mentioned route
app.use("/users", usersRoute);
app.use("/trains", trainsRoute);
app.use("/mobiles", mobilesRoute);

app.listen(3000, () => { console.log('Server Started at http://localhost:3000/') });