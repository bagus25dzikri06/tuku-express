const Pool = require('../config/db')
const selectAll = () => {
  return Pool.query(`SELECT * FROM transactions`)
}
const select = (transaction_id) => {
  return Pool.query(`SELECT * FROM transactions
  WHERE transaction_id=${transaction_id}`)
}
const insert = (
    customer_id, orders, isGettingPaid, isPackedandProcessed,
    isSent, isCompleted, isCancelled
  ) => {
  return Pool.query(`INSERT INTO transactions(
    customer_id, orders, isGettingPaid, isPackedandProcessed,
    isSent, isCompleted, isCancelled
  ) VALUES (
    '${customer_id}', '${orders}', ${isGettingPaid}, ${isPackedandProcessed},
    ${isSent}, ${isCompleted}, ${isCancelled}
  ) RETURNING *`)
}
const update = (
    transaction_id, isGettingPaid, isPackedandProcessed, isSent, isCompleted, isCancelled
  ) => {
  return Pool.query(`UPDATE transactions SET 
    isGettingPaid='${isGettingPaid}', isPackedandProcessed='${isPackedandProcessed}', isSent='${isSent}',
    isCompleted='${isCompleted}' AND isCancelled='${isCancelled}'
  WHERE transaction_id='${transaction_id}'`)
}
const deleteTransactions = (transaction_id) => {
  return Pool.query(`DELETE FROM transactions WHERE transaction_id='${transaction_id}'`)
}
const countTransactions = () =>{
  return Pool.query('SELECT COUNT(*) FROM transactions')
}

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteTransactions,
  countTransactions
}