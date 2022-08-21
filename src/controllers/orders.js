const orderModel = require('../models/orders')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const result = await orderModel.selectAll()
      return success(res, result.rows, 'success', 'Get all orders successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all orders failed')
    }
  },
  getOrder: async (req, res) => {
    const { order_id } = req.params
    try {
      const result = await orderModel.select(order_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Order has not been added')
      return success(res, result.rows, 'success', 'Get order based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get order based by ID failed')
    }
  },
  insert: async (req, res) => {
    const { customer_id, product_id, product_order_total } = req.body
    try {
      const data = await orderModel.insert(customer_id, product_id, product_order_total)
      return success(res, data.rows[0], 'success', 'Order is added')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Order is failed to be added')
    }
  },
  update: async (req, res) => {
    const { order_id } = req.params
    const { product_order_total } = req.body
    try {
      const result = await orderModel.update(order_id, product_order_total)
      return success(res, result, 'success', 'Order is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Order is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { order_id } = req.params
    try {
      const result = await orderModel.deleteOrder(order_id)
      return success(res, result, 'success', 'Order is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Order is failed to be deleted')
    }
  }
}

module.exports = orderController