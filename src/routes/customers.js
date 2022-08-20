const express = require('express')
const router = express.Router()
const customersController = require('../controllers/customers')

router
  .get('/all', customersController.getAllCustomer)
  .get('/', customersController.sort)
  .get('/:customer_id', customersController.getCustomer)
  .post('/', customersController.insert)
  .put('/:customer_id', customersController.update)
  .delete('/:customer_id', customersController.delete)

module.exports = router