require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const UserRouter = require('./src/routes/users')
const ProductRouter = require('./src/routes/products')
const CategoryRouter = require('./src/routes/categories')
const CustomerRouter = require('./src/routes/customers')
const ShippingAddressRouter = require('./src/routes/shipping_addresses')
const SellerRouter = require('./src/routes/sellers')
const OrderRouter = require('./src/routes/orders')
const TransactionRouter = require('./src/routes/transactions')

const PORT = process.env.PORT || 5000
const DB_HOST = process.env.DB_HOST

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(cors())
app.use(morgan('dev'))

app.use('/products', ProductRouter)
app.use('/category', CategoryRouter)
app.use('/customer', CustomerRouter)
app.use('/shipping-address', ShippingAddressRouter)
app.use('/seller', SellerRouter)
app.use('/order', OrderRouter)
app.use('/transaction', TransactionRouter)
app.use('/api', UserRouter)

app.use(bodyParser.json())
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err,req,res)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})
app.listen(PORT, () => {
  console.log(`server running on http://${DB_HOST}:${PORT}`)
})