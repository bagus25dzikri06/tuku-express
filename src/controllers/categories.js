const categoryModel = require('../models/categories')
const createErrors = require('http-errors')
const categoryController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await categoryModel.search(search)
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
      
      const result = await categoryModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await categoryModel.countCategory()
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
  getAllShippingAddresses: (req, res) => {
    categoryModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getShippingAddress: (req, res) => {
    const { category_id } = req.params
    categoryModel.select(category_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: async (req, res) => {
    const { category_name } = req.body
    try {
      const result = await categoryModel.selectCategory(category_name)
      if (result.rowCount > 0) throw new createErrors.BadRequest('This category has been available')

      const data = await categoryModel.insert(category_name)
      res.status(201).json({
        message: 'Category is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  update: async (req, res) => {
    const { category_id } = req.params
    const { category_name } = req.body
    try {
      const result = await categoryModel.update(category_id, category_name)
      res.status(200).json({
        message: 'Category is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { category_id } = req.params
    try {
      const result = await categoryModel.deleteCategory(category_id)
      res.status(200).json({
        message: 'Category is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = categoryController