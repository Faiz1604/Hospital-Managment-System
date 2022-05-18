const mongoose = require("mongoose");
const doctorsSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    mobilenumber: {
        type: Number
    },
    email: {
        type: String
    },
    idnumber: {
        type: Number
    },
    address: {
        type: String,
        require: true
    },
    specialities: {
        type: String,
        default: NaN
    }
})
const Doctors = mongoose.model("doctor", doctorsSchema)
module.exports = Doctors