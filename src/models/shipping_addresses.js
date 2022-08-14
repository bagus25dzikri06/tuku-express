const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM shipping_address`)
}
const search = (search) => {
  return Pool.query(`SELECT * FROM shipping_address 
  WHERE LOWER(shipping_address_name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM shipping_address 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (shipping_address_id) => {
  return Pool.query(`SELECT * FROM shipping_address
  WHERE shipping_address_id=${shipping_address_id}`)
}
const selectShippingAddress = (shipping_address_name) => {
  return Pool.query(`SELECT * FROM shipping_address 
  WHERE shipping_address_name='${shipping_address_name}'`)
}
const insert = (
    customer_id, shipping_address_type, shipping_address_name, city,
    postal_code, recipient_name, recipient_phone_number, isPrimary
  ) => {
  return Pool.query(`INSERT INTO shipping_address(
    customer_id, shipping_address_type, shipping_address_name, city,
    postal_code, recipient_name, recipient_phone_number, isPrimary
  ) VALUES (
    '${customer_id}', '${shipping_address_type}', '${shipping_address_name}', '${city}',
    '${postal_code}', '${recipient_name}', '${recipient_phone_number}', '${isPrimary}'
  ) RETURNING *`)
}
const update = (
    shipping_address_id, customer_id, shipping_address_type, shipping_address_name, city,
    postal_code, recipient_name, recipient_phone_number, isPrimary
  ) => {
  return Pool.query(`UPDATE shipping_address SET 
    customer_id='${customer_id}', shipping_address_type='${shipping_address_type}', shipping_address_name='${shipping_address_name}',
    city='${city}', postal_code='${postal_code}', recipient_name='${recipient_name}', 
    recipient_phone_number='${recipient_phone_number}' AND isPrimary='${isPrimary}'
  WHERE shipping_address_id='${shipping_address_id}'`)
}
const deleteShippingAddress = (shipping_address_id) => {
  return Pool.query(`DELETE FROM shipping_address WHERE shipping_address_id=${shipping_address_id}`)
}
const countShippingAddress = () =>{
  return Pool.query('SELECT COUNT(*) FROM shipping_address')
}

module.exports = {
  selectAll,
  search,
  sort,
  select,
  selectShippingAddress,
  insert,
  update,
  deleteShippingAddress,
  countShippingAddress
}