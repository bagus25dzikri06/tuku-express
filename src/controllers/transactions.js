const transactionModel = require('../models/transactions')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const transactionController = {
  getAllTransactions: async (req, res) => {
    try {
      const result = await transactionModel.selectAll()
      return success(res, result.rows, 'success', 'Get all transactions successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all transactions failed')
    }
  },
  getTransaction: async (req, res) => {
    const { transaction_id } = req.params
    try {
      const result = await transactionModel.select(transaction_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Customer has not been registered')
      return success(res, result.rows, 'success', 'Get transaction based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get transaction based by ID failed')
    }
  },
  insert: async (req, res) => {
    const {
      customer_id, orders, isGettingPaid, isPackedandProcessed,
      isSent, isCompleted, isCancelled
    } = req.body
    try {
      const data = await transactionModel.insert(
        customer_id, orders, isGettingPaid, isPackedandProcessed,
        isSent, isCompleted, isCancelled
      )

      if (
        isGettingPaid === false && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(201).json({
          message: 'Transaction is not getting paid',
          data: data.rows[0]
        })
      } else if (
        isGettingPaid === false && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === true
      ) {
        res.status(201).json({
          message: 'Transaction is cancelled',
          data: data.rows[0]
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(201).json({
          message: 'Transaction is getting paid',
          data: data.rows[0]
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(201).json({
          message: 'Product is packed and processed',
          data: data.rows[0]
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === true &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(201).json({
          message: 'Product is sent',
          data: data.rows[0]
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === true &&
        isCompleted === true &&
        isCancelled === false
      ) {
        res.status(201).json({
          message: 'Transaction is completed',
          data: data.rows[0]
        })
      } else {
        throw new createErrors.BadRequest('Error in transaction processing')
      }
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  update: async (req, res) => {
    const { transaction_id } = req.params
    const {
      customer_id, orders, isGettingPaid, isPackedandProcessed,
      isSent, isCompleted, isCancelled
    } = req.body
    try {
      const data = await transactionModel.update(
        transaction_id, customer_id, orders, 
        isGettingPaid, isPackedandProcessed,
        isSent, isCompleted, isCancelled
      )
      
      if (
        isGettingPaid === false && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(200).json({
          message: 'Transaction is not getting paid',
          data
        })
      } else if (
        isGettingPaid === false && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === true
      ) {
        res.status(200).json({
          message: 'Transaction is cancelled',
          data
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === false &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(200).json({
          message: 'Transaction is getting paid',
          data
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === false &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(200).json({
          message: 'Product is packed and processed',
          data
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === true &&
        isCompleted === false &&
        isCancelled === false
      ) {
        res.status(200).json({
          message: 'Product is sent',
          data
        })
      } else if (
        isGettingPaid === true && 
        isPackedandProcessed === true &&
        isSent === true &&
        isCompleted === true &&
        isCancelled === false
      ) {
        res.status(200).json({
          message: 'Transaction is completed',
          data
        })
      } else {
        throw new createErrors.BadRequest('Error in transaction processing')
      }
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  delete: async (req, res) => {
    const { transaction_id } = req.params
    try {
      const result = await transactionModel.deleteTransactions(transaction_id)
      res.status(200).json({
        message: 'Shipping address is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = transactionController