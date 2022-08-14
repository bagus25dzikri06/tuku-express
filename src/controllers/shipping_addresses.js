const shippingAddressModel = require('../models/shipping_addresses')
const createErrors = require('http-errors')
const shippingAddressController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await shippingAddressModel.search(search)
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
      
      const result = await shippingAddressModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await shippingAddressModel.countShippingAddress()
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
    shippingAddressModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getShippingAddress: (req, res) => {
    const { shipping_address_id } = req.params
    shippingAddressModel.select(shipping_address_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
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
      res.status(201).json({
        message: 'Shipping address is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
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
      res.status(200).json({
        message: 'Shipping address is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { shipping_address_id } = req.params
    try {
      const result = await shippingAddressModel.deleteShippingAddress(shipping_address_id)
      res.status(200).json({
        message: 'Shipping address is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = shippingAddressController