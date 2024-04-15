const mongoose = require("mongoose")
const Notification = mongoose.Schema({
    patientID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    cardID: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    received: {
        type: Boolean
    }

}, {
    timestamps: true
})



module.exports = mongoose.model("notification", Notification)
