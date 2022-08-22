const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM products`)
}
const search = (search) => {
  return Pool.query(`SELECT * FROM products 
  WHERE LOWER(product_name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM products 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (product_id) => {
  return Pool.query(`SELECT * FROM products
  WHERE product_id='${product_id}'`)
}
const selectProduct = (product_name) => {
  return Pool.query(`SELECT * FROM products 
  WHERE product_name='${product_name}'`)
}
const insert = (
    category_id, seller_id, product_name, product_brand, stock,
    price, product_review, product_colors, size, condition,
    product_description, photo
  ) => {
  return Pool.query(`INSERT INTO products(
    category_id, seller_id, product_name, product_brand, stock,
    price, product_review, product_colors, size, condition,
    product_description, photo
  ) VALUES (
    '${category_id}', '${seller_id}', '${product_name}', '${product_brand}', ${stock},
    ${price}, ${product_review}, '${product_colors}', '${size}', '${condition}',
    '${product_description}', '${photo}'
  ) RETURNING *`)
}
const update = (
    products_id, product_name, product_brand, 
    stock, price, product_review, product_colors, size, 
    condition, product_description
  ) => {
  return Pool.query(`UPDATE products SET 
    product_name='${product_name}', product_brand='${product_brand}', stock='${stock}', price='${price}', 
    product_review='${product_review}', product_colors='${product_colors}', size='${size}', condition='${condition}',
    product_description='${product_description}'
  WHERE products_id='${products_id}'`)
}
const deleteProduct = (products_id) => {
  return Pool.query(`DELETE FROM products WHERE products_id='${products_id}'`)
}
const countProduct = () =>{
  return Pool.query('SELECT COUNT(*) FROM products')
}

module.exports = {
  selectAll,
  search,
  sort,
  select,
  selectProduct,
  insert,
  update,
  deleteProduct,
  countProduct
}