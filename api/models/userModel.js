const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    EMIType: {
        type: String,
        required: true,
        enum: ["day", "week"],
    },
    guaranteePerson1: {
        type: String,
        required: true
    },
    guaranteePerson2: {
        type: String,
        required: true
    },
    guaranteePerson1Address: {
        type: String,
        required: true
    },
    guaranteePerson1Phone: {
        type: Number,
        required: true
    },
    guaranteePerson2Address: {
        type: String,
        required: true
    },
    guaranteePerson2Phone: {
        type: Number,
        required: true
    },
    nomineeName: {
        type: String,
        required: true
    },
    nomineeAddress: {
        type: String,
        required: true
    },
    nomineePhone: {
        type: Number,
        required: true
    },
    refferalName: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    startEMI: {
        type: String,
        required: true,
    },
    endEMI: {
        type: String,
        required: true

    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);