const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM customer`)
}
const search = (search) => {
  return Pool.query(`SELECT * FROM customer 
  WHERE LOWER(name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM customer 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM customer WHERE id='${id}'`)
}
const selectCustomerByName = (name) => {
  return Pool.query(`SELECT * FROM customer WHERE name='${name}'`)
}
const selectCustomerByEmail = (email) => {
  return Pool.query(`SELECT * FROM customer WHERE email='${email}'`)
}
const insert = (
    name, email
) => {
  return Pool.query(`INSERT INTO customer(
    name, email, shipping_address_id,
    phone_number, gender, birth_date
  ) VALUES (
    '${name}', '${email}', NULL, NULL, NULL, NULL
  ) RETURNING *`)
}
const updatePassword = (email, password) => {
  return Pool.query(`UPDATE customer SET password='${password}' WHERE email='${email}'`)
}
const update = (id, name, email, phone_number, gender, birth_date) => {
  return Pool.query(`UPDATE customer SET 
    name='${name}', email='${email}', phone_number='${phone_number}', gender='${gender}', birth_date='${birth_date}'
  WHERE id='${id}'`)
}
const deleteCustomer = (id) => {
  return Pool.query(`DELETE FROM customer WHERE id=${id}`)
}
const countCustomer = () =>{
  return Pool.query('SELECT COUNT(*) FROM customer')
}

module.exports = {
  selectAll,
  search,
  sort,
  select,
  selectCustomerByName,
  selectCustomerByEmail,
  insert,
  updatePassword,
  update,
  deleteCustomer,
  countCustomer
}