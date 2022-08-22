const userModel = require('../models/users')
const customerModel = require('../models/customers')
const sellerModel = require('../models/sellers')
const createErrors = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { success, failed } = require('../helper/common')
const authHelper = require('../helper/auth')
const userController = {
  register: async (req, res) => {
    const { email, password, name, role } = req.body
    let passwordHash = bcrypt.hashSync(password)

    try {
      if (
        email === '' || password === '' || 
        name === '' || role === ''
      ) throw new createErrors.Forbidden('All data must be filled in')
      const result = await userModel.findEmail(email)
      if (result.rowCount > 0) throw new createErrors.Forbidden('E-mail has been already used')
      if (password.length < 8) throw new createErrors.Forbidden('Password length should equal or be more than 8')

      const registerData = await userModel.create(email, passwordHash, name, role)
      if (registerData.rows[0].role === 'customer') {
        const customerData = await customerModel.insert(
          registerData.rows[0].name, registerData.rows[0].email
        )
  
        const data = {
          user: registerData,
          customer: customerData
        }
  
        const customerDetails = {
          user: data.user.rows[0],
          customer: data.customer.rows[0],
        }
        return success(res, customerDetails, 'success', `Customer's data is registered successfully`)
      } else if (registerData.rows[0].role === 'seller') {
        const sellerData = await sellerModel.insert(
          registerData.rows[0].name, registerData.rows[0].email
        )

        const data = {
          user: registerData,
          seller: sellerData
        }
  
        const sellerDetails = {
          user: data.user.rows[0],
          seller: data.seller.rows[0],
        }
        return success(res, sellerDetails, 'success', `Seller's data is registered successfully`)
      } else {
        return res.status(400).json({ status: 'failed', message: 'Sorry, your user role/level is not available here' })
      }
    } catch (err) {
      return failed(res, err.message, 'failed', 'Failed to register the user')
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body
    const { rows: [user] } = await userModel.findEmail(email)

    try {
      if (email === '' || password === '') throw new createErrors.Forbidden('All data must be filled in')
      if (!user) throw new createErrors.Forbidden('E-mail is invalid or unregistered')
      let isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) throw new createErrors.Forbidden('Password is invalid')

      delete user.password

      const payload = {
        email: user.email,
        role: user.role
      }
      user.token = authHelper.generateToken(payload)
      user.refreshToken = authHelper.generateRefreshToken(payload)

      return success(res, user, 'success', 'User is logged in successfully')
    } catch (err) {
      return failed(res, err.message, 'failed', 'Failed to log in')
    }
  },
  refreshToken: (req, res) => {
    const { refreshToken } = req.body
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
    const payload = {
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload)
    }
    return success(res, result, 'success', 'Get the refresh token successfully')
  },
  profile: async (req, res) => {
    const { email } = req.payload
    const { rows: [user] } = await userModel.findEmail(email)

    delete user.password

    return success(res, user, 'success', `Get the user's profile successfully`)
  }
}

module.exports = userController