const marketplaceConfigService = require('../services/marketplaceConfigService');

const getMarketplaceConfig = async (req, res) => {
    try {
        const config = await marketplaceConfigService.getMarketplaceConfig();
        res.json(config);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMarketplaceConfig = async (req, res) => {
    try {
        const { transactionFee, withdrawalFee, allowedTokens, platformPolicies } = req.body;

        const updatedConfig = await marketplaceConfigService.updateMarketplaceConfig(
            transactionFee,
            withdrawalFee,
            allowedTokens,
            platformPolicies
        );

        res.json(updatedConfig);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getMarketplaceConfig,
    updateMarketplaceConfig
};
