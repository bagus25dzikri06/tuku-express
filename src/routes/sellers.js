const express = require('express')
const router = express.Router()
const sellersController = require('../controllers/sellers')

router
  .get('/all', sellersController.getAllSeller)
  .get('/', sellersController.sort)
  .get('/seller', sellersController.searchSeller)
  .get('/store', sellersController.searchStore)
  .get('/:id', sellersController.getSeller)
  .post('/', sellersController.insert)
  .put('/:id', sellersController.update)
  .delete('/:id', sellersController.delete)

module.exports = router