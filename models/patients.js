const mongoose = require("mongoose")
const patients = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    cardID: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("patients", patients)
