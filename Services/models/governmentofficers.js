const mongoose = require("mongoose");

let governmentofficersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    nic: String
});

const GovernmentOfficers = mongoose.model('GovernmentOfficers', governmentofficersSchema);

module.exports = GovernmentOfficers;