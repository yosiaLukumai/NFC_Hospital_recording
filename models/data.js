const mongoose = require("mongoose")

const data = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    }

  
}, {
    timestamps: true
})



     

module.exports = mongoose.model("data", data)
