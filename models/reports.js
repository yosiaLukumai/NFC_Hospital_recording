const mongoose = require("mongoose")

const data = mongoose.Schema({
    reportPath: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})





module.exports = mongoose.model("pics", data)
