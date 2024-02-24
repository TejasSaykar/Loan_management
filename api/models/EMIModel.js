const mongoose = require("mongoose");

const EMISchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    // isPaid: {
    //     type: Boolean,
    //     default: false
    // },
    penalty: {
        type: String,
        required: true
    },
    emiAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("emi", EMISchema);