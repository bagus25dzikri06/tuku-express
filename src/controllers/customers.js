const customerModel = require('../models/customers')
const createErrors = require('http-errors')
const customerController = {
  search: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await customerModel.search(search)
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
      
      const result = await customerModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await customerModel.countCustomer()
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
  getAllCustomer: (req, res) => {
    customerModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getCustomer: (req, res) => {
    const { customer_id } = req.params
    customerModel.select(customer_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
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
      res.status(201).json({
        message: 'Customer is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  updatePassword: async (req, res) => {
    const { customer_email } = req.params
    const { password } = req.body

    try {
      const result = await customerModel.updatePassword(customer_email, password)
      res.status(200).json({
        message: `Customer's password is updated`,
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
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
      res.status(200).json({
        message: 'Customer is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { customer_id } = req.params
    try {
      const result = await customerModel.deleteCustomer(customer_id)
      res.status(200).json({
        message: 'Customer is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = customerController