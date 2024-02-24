const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emiAmount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };
