const express = require("express")
const twilio = require("twilio")
const fs = require("fs")
const path = require('path')
var pathToJson = path.resolve(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(pathToJson));
const route = express.Router();


const accountSid = config.accountSid;
const authToken = config.authToken;
const client = new twilio(accountSid, authToken)

//Send Server Generated PIN number to Customer to verify identity of the Phone Number
route.get("/smsVerify/:phoneNo", (req, res) => {

    let pinNo = parseInt(Math.random() * 1000000)
    client.messages.create({
        body: 'National Railway Reservation PIN Number : ' + pinNo,
        from: config.phoneNumber,
        to: req.params.phoneNo
    }).then(message => console.log(message.sid));

    res.status(200).json({ status: true, pin: pinNo })
});

module.exports = route;