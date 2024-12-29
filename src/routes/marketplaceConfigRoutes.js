const express = require('express');
const marketplaceRouter = express.Router();
const marketplaceConfigController = require('../controllers/marketplaceConfigController');

marketplaceRouter.get('/', marketplaceConfigController.getMarketplaceConfig);
marketplaceRouter.put('/', marketplaceConfigController.updateMarketplaceConfig);

module.exports = marketplaceRouter;
