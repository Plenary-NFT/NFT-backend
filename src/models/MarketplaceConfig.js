const mongoose = require('mongoose');

const MarketplaceConfigSchema = new mongoose.Schema({
    transactionFee: {
        type: Number,
        required: true,
        min: 0,
        max: 100, // Max 100% fee
    },
    withdrawalFee: {
        type: Number,
        required: true,
        min: 0,
    },
    allowedTokens: {
        type: [String], // Array of supported tokens (e.g., ['ETH', 'BTC'])
        required: true,
        enum: ['ETH', 'BTC', 'USD', 'USDT'], // Add other tokens as needed
    },
    platformPolicies: {
        minListingPrice: {
            type: Number,
            required: true,
            min: 0, // Prevent negative prices
        },
        supportedCountries: {
            type: [String], // List of supported countries
            default: ['US', 'UK', 'CA'],
        },
        contentModeration: {
            type: Boolean,
            default: true, // Enable or disable content moderation
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MarketplaceConfig', MarketplaceConfigSchema);
