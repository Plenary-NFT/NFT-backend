const Transaction = require('../models/Transactions');
const NFTListing = require('../models/nftListing');
// const blockchainService = require('./blockchainService');

const createTransaction = async (nftId, buyerId, sellerId, price, currency) => {
    const nft = await NFTListing.findById(nftId);
    if (!nft || nft.status !== 'available') {
        throw new Error('NFT not available for sale');
    }

    // TODO: Check if the buyer has enough funds

    const transaction = new Transaction({
        nft: nftId,
        buyer: buyerId,
        seller: sellerId,
        price,
        currency,
        status: 'pending'
    });

    await transaction.save();

    // Trigger blockchain transfer (returns a transaction hash)
    // const transactionHash = await blockchainService.transferNFT(nftId, buyerId, sellerId, price);

    // Update the transaction status to 'completed' and store the transaction hash
    transaction.transactionHash = transactionHash;
    transaction.status = 'completed';
    await transaction.save();

    return transaction;
};

const getAllTransactions = async () => {
    return await Transaction.find()
        .populate('nft buyer seller')
        .sort({ createdAt: -1 });
};

const getTransactionById = async (transactionId) => {
    return await Transaction.findById(transactionId)
        .populate('nft buyer seller');
};

const getUserTransactions = async (userId) => {
    return await Transaction.find({
        $or: [{ buyer: userId }, { seller: userId }]
    })
    .populate('nft buyer seller')
    .sort({ createdAt: -1 });
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    getUserTransactions
};
