const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orders')

router
  .get('/all', orderController.getAllOrders)
  .get('/:order_id', orderController.getOrder)
  .post('/', orderController.insert)
  .put('/:order_id', orderController.update)
  .delete('/:order_id', orderController.delete)

module.exports = router