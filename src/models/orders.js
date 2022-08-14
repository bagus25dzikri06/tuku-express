const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM order`)
}
const select = (order_id) => {
  return Pool.query(`SELECT * FROM order
  WHERE order_id=${order_id}`)
}
const insert = (
    customer_id, product_id, product_order_total
  ) => {
  return Pool.query(`INSERT INTO order(
    customer_id, product_id, product_order_total
  ) VALUES (
    '${customer_id}', '${product_id}', '${product_order_total}'
  ) RETURNING *`)
}
const update = (
    order_id, product_order_total
  ) => {
  return Pool.query(`UPDATE order SET product_order_total='${product_order_total}'
  WHERE order_id='${order_id}'`)
}
const deleteOrder = (order_id) => {
  return Pool.query(`DELETE FROM order WHERE order_id=${order_id}`)
}
const countOrder = () =>{
  return Pool.query('SELECT COUNT(*) FROM order')
}

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteOrder,
  countOrder
}