const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM seller`)
}
const searchSeller = (search) => {
  return Pool.query(`SELECT * FROM seller WHERE LOWER(name) LIKE LOWER('%${search}%')`)
}
const searchStore = (search) => {
  return Pool.query(`SELECT * FROM seller WHERE LOWER(name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM seller WHERE id='${id}'`)
}
const selectSeller = (name) => {
  return Pool.query(`SELECT * FROM seller WHERE name='${name}'`)
}
const selectSellerByEmail = (email) => {
  return Pool.query(`SELECT * FROM seller WHERE email='${email}'`)
}
const insert = (
  name, email
) => {
  return Pool.query(`INSERT INTO seller(
    name, email, phone_number, store_name, store_description
  ) VALUES (
    '${name}', '${email}', NULL, NULL, NULL
  ) RETURNING *`)
}
const updatePassword = (email, password) => {
  return Pool.query(`UPDATE seller SET password='${password}' 
  WHERE seller_email='${email}'`)
}
const update = (id, name, email, phone_number, store_name, store_description) => {
  return Pool.query(`UPDATE seller SET 
    name='${name}', email='${email}', phone_number='${phone_number}', store_name='${store_name}', store_description='${store_description}'
  WHERE id='${id}'`)
}
const deleteSeller = (id) => {
  return Pool.query(`DELETE FROM seller WHERE id='${id}'`)
}
const countSeller = () =>{
  return Pool.query('SELECT COUNT(*) FROM seller')
}

module.exports = {
  selectAll,
  searchSeller,
  searchStore,
  sort,
  select,
  selectSeller,
  selectSellerByEmail,
  insert,
  updatePassword,
  update,
  deleteSeller,
  countSeller
}