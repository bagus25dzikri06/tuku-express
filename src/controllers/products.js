const productModel = require('../models/products')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const productController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await productModel.search(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get product search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get product search results')
    }
  },
  sort: async (req, res) => {
    try{
      const query = req.query

      const page = Number(query.page) || 1
      const limit = Number(query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = query.sortby || 'name'
      const sort = query.sort.toUpperCase() || 'ASC'
      
      const result = await productModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await productModel.countProduct()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get product sort results successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Failed to get product sort results')
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const result = await productModel.selectAll()
      return success(res, result.rows, 'success', 'Get all products successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all products failed')
    }
  },
  getProduct: async (req, res) => {
    const { product_id } = req.params
    try {
      const result = await productModel.select(product_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Product has not been added')
      return success(res, result.rows, 'success', 'Get product based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get product based by ID failed')
    }
  },
  insert: async (req, res) => {
    const {
      category_id, seller_id, product_name, product_brand, stock,
      price, product_review, product_colors, size, condition,
      product_description, photo
    } = req.body
    try {
      const data = await productModel.insert(
        category_id, seller_id, product_name, product_brand, stock,
        price, product_review, product_colors, size, condition,
        product_description, photo
      )
      return success(res, data.rows[0], 'success', 'Product is added')
    } catch (err) {
      return failed(res, err, 'failed', 'Product is failed to be added')
    }
  },
  update: async (req, res) => {
    const { products_id } = req.params
    const {
      product_name, product_brand, stock, price, 
      product_review, product_colors, size, 
      condition, product_description
    } = req.body
    try {
      const result = await productModel.update(
        products_id, product_name, product_brand, 
        stock, price, product_review, product_colors, size, 
        condition, product_description
      )
      return success(res, result, 'success', 'Product is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Product is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { products_id } = req.params
    try {
      const result = await productModel.deleteProduct(products_id)
      return success(res, result, 'success', 'Product is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Customer is failed to be deleted')
    }
  }
}

module.exports = productController