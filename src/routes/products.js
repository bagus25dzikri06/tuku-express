const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')

router
  .get('/all', productController.getAllProducts)
  .get('/search', productController.search)
  .get('/', productController.sort)
  .get('/:products_id', productController.getProduct)
  .post('/', productController.insert)
  .put('/:products_id', productController.update)
  .delete('/:products_id', productController.delete)

module.exports = router