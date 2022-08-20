const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactions')

router
  .get('/all', transactionsController.getAllTransactions)
  .get('/:transaction_id', transactionsController.getTransaction)
  .post('/', transactionsController.insert)
  .put('/:transaction_id', transactionsController.update)
  .delete('/:transaction_id', transactionsController.delete)

module.exports = router