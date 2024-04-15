const mongoose = require("mongoose")

const ward = mongoose.Schema({
    wardNumber: {
        type: String,
        required: true
    },
    noBeds: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})





module.exports = mongoose.model("ward", ward)
