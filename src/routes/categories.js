const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categories')

router
  .get('/all', categoryController.getAllCategories)
  .get('/search', categoryController.search)
  .get('/', categoryController.sort)
  .get('/:category_id', categoryController.getCategory)
  .post('/', categoryController.insert)
  .put('/:category_id', categoryController.update)
  .delete('/:category_id', categoryController.delete)

module.exports = router