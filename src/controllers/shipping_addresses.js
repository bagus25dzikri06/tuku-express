const shippingAddressModel = require('../models/shipping_addresses')
const { success, failed } = require('../helper/common')
const createErrors = require('http-errors')
const shippingAddressController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await shippingAddressModel.search(search)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Result not found')
      
      return success(res, result.rows, 'success', 'Get shipping address search results successfully')
    }catch(err){
      return failed(res, err.message, 'failed', 'Failed to get shipping address search results')
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
      
      const result = await shippingAddressModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await shippingAddressModel.countShippingAddress()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      
      return success(res, result.rows, 'success', 'Get shipping address sort results successfully', pagination)
    }catch(err){
      return failed(res, err, 'failed', 'Failed to get shipping address sort results')
    }
  },
  getAllShippingAddresses: async (req, res) => {
    try {
      const result = await shippingAddressModel.selectAll()
      return success(res, result.rows, 'success', 'Get all shipping addresses successfully')
    } catch (err) {
      return failed(res, err, 'failed', 'Get all shipping addresses failed')
    }
  },
  getShippingAddress: async (req, res) => {
    const { shipping_address_id } = req.params
    try {
      const result = await shippingAddressModel.select(shipping_address_id)
      if (result.rowCount === 0) throw new createErrors.BadRequest('Seller has not been registered')
      return success(res, result.rows, 'success', 'Get shipping address based by ID successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Get shipping address based by ID failed')
    }
  },
  insert: async (req, res) => {
    const {
      customer_id, shipping_address_type, shipping_address_name, city,
      postal_code, recipient_name, recipient_phone_number, isPrimary
    } = req.body
    try {
      const data = await shippingAddressModel.insert(
        customer_id, shipping_address_type, shipping_address_name, city,
        postal_code, recipient_name, recipient_phone_number, isPrimary
      )
      return success(res, data.rows[0], 'success', 'Shipping address is added')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Shipping address is failed to be added')
    }
  },
  update: async (req, res) => {
    const { shipping_address_id } = req.params
    const {
      customer_id, shipping_address_type, shipping_address_name, city,
      postal_code, recipient_name, recipient_phone_number, isPrimary
    } = req.body
    try {
      const result = await shippingAddressModel.update(
        shipping_address_id, customer_id, shipping_address_type, shipping_address_name, city,
        postal_code, recipient_name, recipient_phone_number, isPrimary
      )
      return success(res, result, 'success', 'Shipping address is updated')
    } catch (err) {
      return failed(res, err, 'failed', 'Shipping address is failed to be updated')
    }
  },
  delete: async (req, res) => {
    const { shipping_address_id } = req.params
    try {
      const result = await shippingAddressModel.deleteShippingAddress(shipping_address_id)
      return success(res, result, 'success', 'Shipping address is deleted')
    } catch (err) {
      return failed(res, err, 'failed', 'Shipping address is failed to be deleted')
    }
  }
}

module.exports = shippingAddressController