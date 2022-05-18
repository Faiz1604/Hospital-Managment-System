const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const appointmentSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    symptoms: {
        type: String,
        require: true
    }
})

const Appointment = mongoose.model("appointment", appointmentSchema)
module.exports = Appointment