const orderModel = require('../models/orders')
const orderController = {
  getAllOrders: (req, res) => {
    orderModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getOrder: (req, res) => {
    const { order_id } = req.params
    orderModel.select(order_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: async (req, res) => {
    const { customer_id, product_id, product_order_total } = req.body
    try {
      const data = await orderModel.insert(customer_id, product_id, product_order_total)
      res.status(201).json({
        message: 'Order is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  update: async (req, res) => {
    const { order_id } = req.params
    const { product_order_total } = req.body
    try {
      const result = await orderModel.update(order_id, product_order_total)
      res.status(200).json({
        message: 'Order is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { order_id } = req.params
    try {
      const result = await orderModel.deleteOrder(order_id)
      res.status(200).json({
        message: 'Order is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = orderController