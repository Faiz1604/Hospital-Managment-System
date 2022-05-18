const mongoose = require("mongoose");

const patientDetailSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    dateofbirth: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    bedalloted: {
        type: String,
        default: null
    },
    bedalloteddate: {
        type: Date,
        require: true
    },
    bednumber: {
        type: Number,
        default: null
    },
    mobilenumber: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    assigneddoctor: {
        type: String,
        require: true
    },
    doctorid: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    admitdate: {
        type: Date,
        require: true
    },
    discharged: {
        type: Boolean,
        default: false
    },
    dischargeddate: {
        type: Date,
        default: null
    }
})

const PatientDetails = mongoose.model("patientdetail", patientDetailSchema)
module.exports = PatientDetails