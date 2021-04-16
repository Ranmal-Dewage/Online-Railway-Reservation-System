const express = require("express")
const route = express.Router();
const Users = require("../models/users");
const GovernmentOfficers = require("../models/governmentofficers");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const fs = require("fs");
const path = require('path');
var pathToJson = path.resolve(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(pathToJson));


//Login process of customer
route.post("/login", (req, res) => {

    const query = { email: req.body.email, password: req.body.password }
    Users.find(query, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });

});


//Card Payment process of customer
route.put("/cardPayment", (req, res) => {

    let uid = req.body.uid
    let fullname = req.body.fullname
    let email = req.body.email

    delete req.body.uid
    delete req.body.fullname
    delete req.body.email
    delete req.body.isLoading

    const query = { _id: uid }
    Users.updateOne(query, { $push: { reservations: req.body } }, (err) => {

        if (err) {
            console.log(err)
            res.status(500).json(err);
        } else {

            let transpoter = nodemailer.createTransport({
                service: "gmail",
                secure: false,
                port: 25,
                auth: {
                    user: config.email,
                    pass: config.emailPassword
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            let HelperOption = {
                from: '"National Railways" <' + config.email,
                to: email,
                subject: "Train Reservation Details",
                html: "<h3>Customer Name : </h3>" + fullname + "\n \n" + "<h3>Customer ID : </h3>" + uid + "\n \n" +
                    "<h3>Train Name : </h3>" + req.body.trainName + "\n \n" + "<h3>Reserved Date : </h3>" + req.body.date + "\n \n" +
                    "<h3>Train Departure : </h3>" + req.body.departureStation + "\n \n" + "<h3>Train Destination : </h3>" +
                    req.body.destinationStation + "\n \n" + "<h3>Number of Tickets : </h3>" + req.body.tickets + "\n \n" +
                    "<h3>Total Amount : Rs. </h3>" + req.body.amount + "\n \n" + "<h3>Payment Type : </h3>" +
                    req.body.paymentType + "\n \n" + "<h3>Card Holder's Name : </h3>" + req.body.cardHolderName + "\n \n" +
                    "<h3>Transaction Date : </h3>" + new Date() + "\n \n"
            }

            transpoter.sendMail(HelperOption, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json(err);
                } else {
                    console.log("Email Sent")
                }
            })

            res.status(200).json({ status: true })

        }

    })

});


//Mobile Payment process of customer
route.put("/mobilePayment", (req, res) => {

    let uid = req.body.uid
    let fullname = req.body.fullname

    delete req.body.uid
    delete req.body.fullname
    delete req.body.email
    delete req.body.isLoading
    delete req.body.realPinNumber
    delete req.body.typedPinNumber

    const query = { _id: uid }
    Users.updateOne(query, { $push: { reservations: req.body } }, (err) => {

        if (err) {
            console.log(err)
            res.status(500).json(err);
        } else {

            const accountSid = config.accountSid;
            const authToken = config.authToken;
            const client = new twilio(accountSid, authToken)

            client.messages.create({
                body: "National Railway Reservation Details: \n\n" + "Customer Name : " + fullname + "\n" + "Customer ID : " + uid +
                    "\n" + "Train Name : " + req.body.trainName + "\n" + "Reserved Date : " + req.body.date + "\n" +
                    "Train Departure : " + req.body.departureStation + "\n" + "Train Destination : " + req.body.destinationStation +
                    "\n" + "Number of Tickets : " + req.body.tickets + "\n" + "Total Amount : Rs." + req.body.amount + "\n" +
                    "Transaction Date : " + new Date(),
                from: config.phoneNumber,
                to: req.body.phoneNumber
            }).then(message => console.log(message.sid));

            res.status(200).json({ status: true })

        }

    })

});


//Registration process of customer
route.post("/register", (req, res) => {


    const query = { $or: [{ email: req.body.email }, { phone: req.body.phone }] }
    Users.find(query, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            if (user.length != 0) {
                res.status(200).json({ userExist: true });
            } else {

                let users = new Users(req.body);
                users.save(err => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {

                        res.status(200).json({ userExist: false });

                    }
                });

            }

        }
    });

});


//Checking whether users is a Government Officer
route.post("/checkGovernmentOfficers", (req, res) => {

    const query = { nic: req.body.nic }
    GovernmentOfficers.find(query, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(200).json(user);
        }
    });

});


module.exports = route;