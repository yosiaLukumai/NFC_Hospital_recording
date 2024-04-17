const mongoose = require("mongoose")
const checkup = mongoose.Schema({
    patientID: {
        type: mongoose.Types.ObjectId
    },
    BloodType: {
        type: String,
        required: true,
    },
    temp: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})



module.exports = mongoose.model("checkup", checkup)
