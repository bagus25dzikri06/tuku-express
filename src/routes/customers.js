const express = require('express')
const router = express.Router()
const customersController = require('../controllers/customers')
//const { protect } = require('../middleware/auth')

router
  .get('/all', customersController.getAllCustomer)
  .get('/', customersController.sort)
  .get('/:id', customersController.getCustomer)
  .put('/:id', customersController.update)
  .delete('/:id', customersController.delete)

module.exports = router