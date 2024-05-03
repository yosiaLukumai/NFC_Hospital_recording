const mongoose = require("mongoose")
const patients = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    wardNumber: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    cardID: {
        type: String,
        required: true,
        unique: true
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
    },
    nurseID: {
        type: mongoose.Types.ObjectId,
    }
}, {
    timestamps: true
})



module.exports = mongoose.model("patients", patients)
