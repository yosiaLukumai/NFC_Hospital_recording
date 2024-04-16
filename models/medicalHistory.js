const mongoose = require("mongoose")
const medicalHistory = mongoose.Schema({
    patientID: {
        type: String
    },
    patientproblem: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})



module.exports = mongoose.model("medicalHistory", medicalHistory)
