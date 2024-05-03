const mongoose = require("mongoose")
const Notification = mongoose.Schema({
    TargettedUser: {
        type: mongoose.Types.ObjectId
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
