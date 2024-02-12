const mongoose = require("mongoose");

const EMISchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    EMIAmount: {
        type: Number,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    penaltyAmount: {
        type: Number,
        required: true
    },
    totalPenalty: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("emi", EMISchema);