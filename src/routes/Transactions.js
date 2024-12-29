const express = require('express');
const TransactionsRouter = express.Router();
const transactionController = require('../controllers/Transactions');

TransactionsRouter.post('/', transactionController.createTransaction);
TransactionsRouter.get('/', transactionController.getAllTransactions);
TransactionsRouter.get('/:id', transactionController.getTransactionById);
TransactionsRouter.get('/user/:userId', transactionController.getUserTransactions);

module.exports = TransactionsRouter;
