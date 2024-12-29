const transactionService = require('../services/Transactions');

const createTransaction = async (req, res) => {
    try {
        const { nftId, buyerId, sellerId, price, currency } = req.body;

        const transaction = await transactionService.createTransaction(nftId, buyerId, sellerId, price, currency);

        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getUserTransactions(req.params.userId);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    getUserTransactions
};
