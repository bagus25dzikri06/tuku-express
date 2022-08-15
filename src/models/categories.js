const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM category`)
}
const search = (search) => {
  return Pool.query(`SELECT * FROM category 
  WHERE LOWER(category_name) LIKE LOWER('%${search}%')`)
}
const sort = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM category 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (category_id) => {
  return Pool.query(`SELECT * FROM category
  WHERE category_id=${category_id}`)
}
const selectCategory = (category_name) => {
  return Pool.query(`SELECT * FROM category 
  WHERE category_name='${category_name}'`)
}
const insert = (category_name) => {
  return Pool.query(`INSERT INTO category(
    category_name
  ) VALUES ('${category_name}') RETURNING *`)
}
const update = (category_id, category_name) => {
  return Pool.query(`UPDATE category SET 
    category_name='${category_name}'
  WHERE category_id='${category_id}'`)
}
const deleteCategory = (category_id) => {
  return Pool.query(`DELETE FROM category WHERE category_id='${category_id}'`)
}
const countCategory = () =>{
  return Pool.query('SELECT COUNT(*) FROM category')
}

module.exports = {
  selectAll,
  search,
  sort,
  select,
  selectCategory,
  insert,
  update,
  deleteCategory,
  countCategory
}