const mongoose = require("mongoose")
const medicalHistory = mongoose.Schema({
    patientproblem: {
        type: String,
        required: true,
        unique: true
    },
    
}, {
    timestamps: true
})



module.exports = mongoose.model("medicalHistory", medicalHistory)
