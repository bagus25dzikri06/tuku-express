const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM seller`)
}
const searchSeller = (search) => {
  return Pool.query(`SELECT * FROM seller 
  WHERE LOWER(seller_name) LIKE LOWER('%${search}%')`)
}
const searchStore = (search) => {
  return Pool.query(`SELECT * FROM seller 
  WHERE LOWER(store_name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM seller 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (seller_id) => {
  return Pool.query(`SELECT * FROM seller
  WHERE seller_id=${seller_id}`)
}
const selectSeller = (seller_name) => {
  return Pool.query(`SELECT * FROM seller 
  WHERE seller_name='${seller_name}'`)
}
const insert = (
  seller_name, seller_email, password,
  phone_number, store_name, store_description
) => {
  return Pool.query(`INSERT INTO seller(
    seller_name, seller_email, password,
    phone_number, store_name, store_description
  ) VALUES (
    '${seller_name}', '${seller_email}', '${password}', 
    '${phone_number}', '${store_name}', '${store_description}'
  ) RETURNING *`)
}
const updatePassword = (seller_email, password) => {
  return Pool.query(`UPDATE seller SET password='${password}' 
  WHERE seller_email='${seller_email}'`)
}
const update = (seller_id, seller_name, seller_email, phone_number, store_name, store_description) => {
  return Pool.query(`UPDATE seller SET 
    seller_name='${seller_name}', seller_email='${seller_email}', phone_number='${phone_number}', 
    store_name='${store_name}' AND store_description='${store_description}'
  WHERE seller_id='${seller_id}'`)
}
const deleteSeller = (seller_id) => {
  return Pool.query(`DELETE FROM seller WHERE seller_id=${seller_id}`)
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
  insert,
  updatePassword,
  update,
  deleteSeller,
  countSeller
}