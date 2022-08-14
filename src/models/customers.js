const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM customer`)
}
const search = (search) => {
  return Pool.query(`SELECT * FROM customer 
  WHERE LOWER(customer_name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM customer 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (customer_id) => {
  return Pool.query(`SELECT * FROM customer
  WHERE customer_id=${customer_id}`)
}
const selectCustomer = (customer_name) => {
  return Pool.query(`SELECT * FROM customer 
  WHERE customer_name='${customer_name}'`)
}
const insert = (
    customer_name, customer_email, password, shipping_address_id,
    phone_number, gender, birth_date
  ) => {
  return Pool.query(`INSERT INTO customer(
    customer_name, customer_email, password, shipping_address_id,
    phone_number, gender, birth_date
  ) VALUES (
    '${customer_name}', '${customer_email}', '${password}', '${shipping_address_id}', 
    '${phone_number}', '${gender}', '${birth_date}'
  ) RETURNING *`)
}
const updatePassword = (customer_email, password) => {
  return Pool.query(`UPDATE customer SET password='${password}' 
  WHERE customer_email='${customer_email}'`)
}
const update = (customer_id, customer_name, customer_email, phone_number, gender, birth_date) => {
  return Pool.query(`UPDATE customer SET 
    customer_name='${customer_name}', customer_email='${customer_email}', phone_number='${phone_number}', 
    gender='${gender}' AND birth_date='${birth_date}'
  WHERE customer_id='${customer_id}'`)
}
const deleteCustomer = (customer_id) => {
  return Pool.query(`DELETE FROM customer WHERE customer_id=${customer_id}`)
}
const countCustomer = () =>{
  return Pool.query('SELECT COUNT(*) FROM customer')
}

module.exports = {
  selectAll,
  search,
  sort,
  select,
  selectCustomer,
  insert,
  updatePassword,
  update,
  deleteCustomer,
  countCustomer
}