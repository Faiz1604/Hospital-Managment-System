const mongoose = require("mongoose");
const enquirySchema = mongoose.Schema({
    Firstname: {
        type: String,
        require: true
    },
    Lastname: {
        type: String,
        require: true
    },
    Number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Message: {
        type: String,
        require: true
    }

})

const Enquiry = mongoose.model("enquiry", enquirySchema);

module.exports = Enquiry