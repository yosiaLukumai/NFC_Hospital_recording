const mongoose = require("mongoose")
const medicalHistory = mongoose.Schema({
    patientID: {

    },
    patientproblem: {
        type: String,
        required: true,
    },
    
}, {
    timestamps: true
})



module.exports = mongoose.model("medicalHistory", medicalHistory)
