const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    nft: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NFTListing',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        enum: ['ETH', 'USD', 'BTC'] 
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    transactionHash: {
        type: String,
        default: null // Blockchain transaction hash
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
