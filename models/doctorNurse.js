const mongoose = require("mongoose")
const doctorNurse = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
    },
    onduty: {
        type: Boolean
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("doctorsNurse", doctorNurse)
