const mongoose = require("mongoose")

const data = mongoose.Schema({
    imgPath: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})





module.exports = mongoose.model("pics", data)
