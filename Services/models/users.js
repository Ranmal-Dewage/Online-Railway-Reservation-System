const mongoose = require("mongoose");

let usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    district: String,
    city: String,
    phone: String,
    reservations: [{
        paymentType: String, tid: String, trainName: String, departureStation: String,
        destinationStation: String, tickets: String, date: String, amount: Number, nic: String,
        ccNumber: String, cardHolderName: String, phoneNumber: String, phoneOwnerName: String
    }]
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
