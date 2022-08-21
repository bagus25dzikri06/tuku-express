const customerModel = require('../models/customers')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const customerController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await customerModel.search(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get customer search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get customer search results')
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
      
      const result = await customerModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await customerModel.countCustomer()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get customer sort results successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Failed to get customer sort results')
    }
  },
  getAllCustomer: async (req, res) => {
    try {
      const result = await customerModel.selectAll()
      return success(res, result.rows, 'success', 'Get all customers successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all customers failed')
    }
  },
  getCustomer: async (req, res) => {
    const { customer_id } = req.params
    try {
      const result = await customerModel.select(customer_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Customer has not been registered')
      return success(res, result.rows, 'success', 'Get customer based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get customer based by ID failed')
    }
  },
  insert: async (req, res) => {
    const {
      customer_name, customer_email, password, shipping_address_id,
      phone_number, gender, birth_date
    } = req.body
    try {
      const result = await customerModel.select(customer_name)
      if (result.rowCount > 0) throw new createErrors.BadRequest(`This customer's name has been used`)

      const data = await customerModel.insert(
        customer_name, customer_email, password, shipping_address_id,
        phone_number, gender, birth_date
      )
      return success(res, data.rows[0], 'success', 'Customer is added')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Customer is failed to be added')
    }
  },
  updatePassword: async (req, res) => {
    const { customer_email } = req.params
    const { password } = req.body

    try {
      const result = await customerModel.updatePassword(customer_email, password)
      return success(res, result, 'success', `Customer's password is updated`)
    } catch (err) {
      return failed(res, err, 'failed', `Customer's password is failed to be updated`)
    }
  },
  update: async (req, res) => {
    const { customer_id } = req.params
    const {
      customer_name, customer_email, shipping_address_id,
      phone_number, gender, birth_date
    } = req.body
    try {
      const result = await customerModel.update(
        customer_id, customer_name, customer_email,
        shipping_address_id, phone_number, gender, birth_date
      )
      return success(res, result, 'success', 'Customer is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Customer is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { customer_id } = req.params
    try {
      const result = await customerModel.deleteCustomer(customer_id)
      return success(res, result, 'success', 'Customer is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Customer is failed to be deleted')
    }
  }
}

module.exports = customerController