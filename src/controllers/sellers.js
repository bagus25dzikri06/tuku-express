const sellerModel = require('../models/sellers')
const createErrors = require('http-errors')
const sellerController = {
  searchSeller: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await sellerModel.searchSeller(search)
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
  searchStore: async (req, res) => {
    try{
      const query = req.query

      const search = query.search || ''
      const result = await sellerModel.searchStore(search)
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
      
      const result = await sellerModel.sort({limit, offset, sort, sortby})
      const {rows: [count]} = await sellerModel.countSeller()
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
  getAllSeller: (req, res) => {
    sellerModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getSeller: (req, res) => {
    const { seller_id } = req.params
    sellerModel.select(seller_id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: async (req, res) => {
    const {
      seller_name, seller_email, phone_number, password, store_name, store_description
    } = req.body
    try {
      const result = await sellerModel.select(seller_name)
      if (result.rowCount > 0) throw new createErrors.BadRequest(`This customer's name has been used`)

      const data = await sellerModel.insert(
        seller_name, seller_email, phone_number, password, store_name, store_description
      )
      res.status(201).json({
        message: 'Seller is added',
        data: data.rows[0]
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  updatePassword: async (req, res) => {
    const { seller_email } = req.params
    const { password } = req.body

    try {
      const result = await sellerModel.updatePassword(seller_email, password)
      res.status(200).json({
        message: `Seller's password is updated`,
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  update: async (req, res) => {
    const { seller_id } = req.params
    const {
      seller_name, seller_email, phone_number, store_name, store_description
    } = req.body
    try {
      const result = await sellerModel.update(
        seller_id, seller_name, seller_email, phone_number, store_name, store_description
      )
      res.status(200).json({
        message: 'Seller is updated',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  },
  delete: async (req, res) => {
    const { seller_id } = req.params
    try {
      const result = await sellerModel.deleteSeller(seller_id)
      res.status(200).json({
        message: 'Seller is deleted',
        data: result
      })
    } catch (err) {
      res.status(500).json({
        message: err
      })
    }
  }
}

module.exports = sellerController