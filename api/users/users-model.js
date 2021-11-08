const db = require('../../data/db-config')

function find() {
  return db('users').select('user_id', 'username')
}

async function findBy(filter) {
  const result = await db('users').where(filter).orderBy('user_id')
  return result
}

function findById(user_id) {
  const checkingId = db('users')
    .select('user_id', 'username')
    .where({ user_id })
    .first()
  return checkingId
}

async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

module.exports = {
  find,
  findBy,
  findById,
  add,
}