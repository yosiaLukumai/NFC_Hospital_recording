const mongoose = require("mongoose")

const data = mongoose.Schema({
    cardID: {
        type: String,
        required: true,
    },
    emergenecy: {
        type: Boolean,
        required: true
    }

}, {
    timestamps: true
})





module.exports = mongoose.model("data", data)
