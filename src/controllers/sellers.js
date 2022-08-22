const sellerModel = require('../models/sellers')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const sellerController = {
  searchSeller: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await sellerModel.searchSeller(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get seller search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get seller search results')
    }
  },
  searchStore: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await sellerModel.searchStore(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get store search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get store search results')
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
      
      const result = await sellerModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await sellerModel.countSeller()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get seller sort results successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Failed to get seller sort results')
    }
  },
  getAllSeller: async (req, res) => {
    try {
      const result = await sellerModel.selectAll()
      return success(res, result.rows, 'success', 'Get all sellers successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all sellers failed')
    }
  },
  getSeller: async (req, res) => {
    const { id } = req.params
    try {
      const result = await sellerModel.select(id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Seller has not been registered')
      return success(res, result.rows, 'success', 'Get seller based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get seller based by ID failed')
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const {
      seller_name, seller_email, phone_number, store_name, store_description
    } = req.body
    try {
      const result = await sellerModel.update(
        id, seller_name, seller_email, phone_number, store_name, store_description
      )
      return success(res, result, 'success', 'Seller is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Seller is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      const result = await sellerModel.deleteSeller(id)
      return success(res, result, 'success', 'Seller is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Customer is failed to be deleted')
    }
  }
}

module.exports = sellerController