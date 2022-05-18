const express = require('express')
const fs = require("fs")
const app = express();
const bodyParser = require("body-parser")
require("./db/connect/connect")
const port = 3000;
//modals
const Enquiry = require("./db/connect/models/enquiry");
const Appointment = require("./db/connect/models/appointment")
const Doctors = require("./db/connect/models/doctorsdetails")
const PatientDetails = require("./db/connect/models/patientdetail")
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("../public"))
app.set("view engine", "ejs")
app.set("views", "./views")
    // to submit enquiry form
app.post("/contact-us/submit", async(req, res) => {
        const enquiryData = await new Enquiry(req.body)
        enquiryData.save().then(() => {
            res.render("enquiry_response")
        }).catch((e) => {
            console.log(e)
        })

    })
    //to delete enquiry
app.post("/enquiry/delete/:id", async(req, res) => {
        try {
            const data = await Enquiry.findOneAndDelete({ _id: req.params.id })
            res.redirect("/enquiry")
        } catch (e) {
            console.log(e)

        }

    })
    //submit appointment
app.post('/appointment', async(req, res) => {
        const appointmentData = await new Appointment(req.body)
        appointmentData.save().then(() => {
            // alert("success")
            res.render("appointment_response", {
                appointmentData: appointmentData
            })

        })
    })
    //to delete appointment
app.post("/delete/appointment/:id", async(req, res) => {
        const result = await Appointment.findByIdAndDelete(req.params.id)
        res.redirect("/appointment")
    })
    // to register doctor

app.post("/registerdoctor", (req, res) => {
    const doctorsdetails = new Doctors(req.body)
    doctorsdetails.save().then(() => {
        res.send("Registration Done..")
    }).catch((e) => {
        console.log("error")
    })
})

//to delete doctors details

app.post("/delete/doctors/:id", async(req, res) => {
    try {
        const result = await Doctors.findByIdAndDelete(req.params.id)
        res.redirect("/readdoctorsdetails")
    } catch (e) {
        console.log(e)
    }

})

//to update doctors details

app.post("/edit/doctors/:id", async(req, res) => {
        try {
            const dataToUpdate = await Doctors.findById(req.params.id);
            res.render("editdoctors", { dataToUpdate: dataToUpdate })
        } catch (e) {
            console.log(e)
        }

    })
    //submit edited doctor data data
app.post("/edit/submit/:id", async(req, res) => {
    await Doctors.findByIdAndUpdate(req.params.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,

        gender: req.body.gender,
        mobilenumber: req.body.mobilenumber,
        email: req.body.email,
        idnumber: req.body.idnumber,
        address: req.body.address,
        specialities: req.body.specialities

    })
    res.redirect("/readdoctorsdetails")

})

//to add patient

app.post("/addpatient", async(req, res) => {
        try {
            const patientData = await new PatientDetails(req.body)
            patientData.save().then(() => {
                res.render("adding_patient_response", { patientData: patientData })
            }).catch((e) => {
                res.send(e)
            })
        } catch (e) {
            console.log(e)
        }

    })
    //discharge patient

app.post("/discharge/patient/:id", async(req, res) => {
        const dischargedate = new Date();
        console.log(req.params.id)
        const data = await PatientDetails.findOneAndUpdate({ _id: req.params.id }, {
            discharged: true,
            dischargeddate: dischargedate
        })
        res.redirect("/patients/patientsdetail")
    })
    //to read enquiry
app.get("/enquiry", async(req, res) => {
        try {
            const enquiry_data = await Enquiry.find();
            res.render('enquiries', {
                enquiry_data: enquiry_data
            })
        } catch (e) {
            console.log(e)
        }

    })
    // to read appointment
app.get("/appointment", async(req, res) => {
    try {
        const appointmentData = await Appointment.find().sort({ date: 1 })
        res.render("appointment", { appointmentData: appointmentData })
    } catch (e) {
        console.log(e)
    }

});
//to read doctor details
app.get("/readdoctorsdetails", async(req, res) => {
    try {
        const doctorsData = await Doctors.find().sort({ name: 1 })
        res.render("doctorsdetails", { doctorsData: doctorsData });
    } catch (e) {
        console.log(e)
    }
})
app.get("/patients/patientsdetail", async(req, res) => {
        const patientsData = await PatientDetails.find().sort({ admitdate: -1 })
        res.render("patientsdetails", {
            patientsData: patientsData
        })
    })
    //read discharged patient data
app.get("/patients/discharged", async(req, res) => {
    const patientsData = await PatientDetails.find().sort({ date: 1 })
    res.render("dischargedpatients", { patientsData: patientsData })
})

app.listen(port, () => { console.log("server listening...") });