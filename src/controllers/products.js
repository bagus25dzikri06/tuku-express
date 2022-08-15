const productModel = require('../models/products')
const createErrors = require('http-errors')
const productController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await productModel.search(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      res.status(200).json({
        data: result.rows
      })
    }catch(err){
      res.status(500).json({
        message: err.message
      })
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
      
      res.status(200).json({
        pagination:{
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage
        },
        data: result.rows
      })
    }catch(error){
      console.log(error);
    }
  },
  getAllProducts: (req, res) => {
    productModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getProduct: (req, res) => {
    const { product_id } = req.params
    productModel.select(product_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: async (req, res) => {
    const {
      category_id, seller_id, product_name, product_brand, stock,
      price, product_review, product_colors, size, condition,
      product_description
    } = req.body
    try {
      const data = await productModel.insert(
        category_id, seller_id, product_name, product_brand, stock,
        price, product_review, product_colors, size, condition,
        product_description
      )
      res.status(201).json({
        message: 'Product is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
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
      res.status(200).json({
        message: 'Product is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { products_id } = req.params
    try {
      const result = await productModel.deleteProduct(products_id)
      res.status(200).json({
        message: 'Product is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = productController