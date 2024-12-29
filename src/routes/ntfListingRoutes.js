const NFTListingController = require('../controllers/nftListing');
const express = require('express');
const NFTListingRouter = express.Router();
// const authMiddleware = require('../middlewares/auth');

NFTListingRouter.post('/nfts', NFTListingController.create);
NFTListingRouter.get('/nfts', NFTListingController.getAll);
NFTListingRouter.get('/nfts/:id', NFTListingController.getById);
NFTListingRouter.patch('/nfts/:id', NFTListingController.update);
NFTListingRouter.delete('/nfts/:id', NFTListingController.delete);
NFTListingRouter.get('/nfts/owner/:ownerId', NFTListingController.getByOwner);

module.exports = NFTListingRouter