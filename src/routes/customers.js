const express = require('express')
const router = express.Router()
const customersController = require('../controllers/customers')

router
  .get('/all', customersController.getAllCustomer)
  .get('/', customersController.sort)
  .get('/:id', customersController.getCustomer)
  .post('/', customersController.insert)
  .put('/:id', customersController.update)
  .delete('/:id', customersController.delete)

module.exports = router