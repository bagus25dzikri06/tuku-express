const Pool = require('../config/db')
const findEmail = (email) => {
  return Pool.query(`SELECT * FROM users WHERE email='${email}'`)
}
const create = (email, password, name, role) => {
  return Pool.query(`INSERT INTO users(
    email, password, name, role
  ) VALUES (
    '${email}', '${password}', '${name}', '${role}'
  ) RETURNING *`)
}

module.exports = {
  findEmail,
  create
}