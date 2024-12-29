const MarketplaceConfig = require('../models/MarketplaceConfig');

const getMarketplaceConfig = async () => {
    const config = await MarketplaceConfig.findOne();
    if (!config) {
        throw new Error('Marketplace configuration not found');
    }
    return config;
};

// Update the marketplace configuration
const updateMarketplaceConfig = async (transactionFee, withdrawalFee, allowedTokens, platformPolicies) => {
    // Validate the tokens
    const validTokens = ['ETH', 'BTC', 'USD', 'USDT']; // Example tokens, you can add more
    const isValidTokens = allowedTokens.every(token => validTokens.includes(token));
    if (!isValidTokens) {
        throw new Error('Invalid token(s) provided');
    }

    // Find the existing configuration
    let config = await MarketplaceConfig.findOne();
    if (!config) {
        throw new Error('Marketplace configuration not found');
    }

    // Update the configuration
    config.transactionFee = transactionFee;
    config.withdrawalFee = withdrawalFee;
    config.allowedTokens = allowedTokens;
    config.platformPolicies = platformPolicies;
    config.updatedAt = Date.now();

    await config.save();
    return config;
};

module.exports = {
    getMarketplaceConfig,
    updateMarketplaceConfig
};
