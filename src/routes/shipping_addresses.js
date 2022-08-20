const express = require('express')
const router = express.Router()
const shippingAddressController = require('../controllers/shipping_addresses')

router
  .get('/all', shippingAddressController.getAllShippingAddresses)
  .get('/search', shippingAddressController.search)
  .get('/', shippingAddressController.sort)
  .get('/:shipping_address_id', shippingAddressController.getShippingAddress)
  .post('/', shippingAddressController.insert)
  .put('/:shipping_address_id', shippingAddressController.update)
  .delete('/:shipping_address_id', shippingAddressController.delete)

module.exports = router