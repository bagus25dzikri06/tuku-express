const categoryModel = require('../models/categories')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const categoryController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await categoryModel.search(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get category search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get category search results')
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
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get category sort results successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Failed to get category sort results')
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const result = await categoryModel.selectAll()
      return success(res, result.rows, 'success', 'Get all categories successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all categories failed')
    }
  },
  getCategory: async (req, res) => {
    const { category_id } = req.params
    try {
      const result = await categoryModel.select(category_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Category has not been added')
      return success(res, result.rows, 'success', 'Get category based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get category based by ID failed')
    }
  },
  insert: async (req, res) => {
    const { category_name } = req.body
    try {
      const result = await categoryModel.selectCategory(category_name)
      if (result.rowCount > 0) throw new createErrors.BadRequest('This category has been available')

      const data = await categoryModel.insert(category_name)
      return success(res, data.rows[0], 'success', 'Category is added')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Category is failed to be added')
    }
  },
  update: async (req, res) => {
    const { category_id } = req.params
    const { category_name } = req.body
    try {
      const result = await categoryModel.update(category_id, category_name)
      return success(res, result, 'success', 'Category is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Category is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { category_id } = req.params
    try {
      const result = await categoryModel.deleteCategory(category_id)
      return success(res, result, 'success', 'Category is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Category is failed to be deleted')
    }
  }
}

module.exports = categoryController