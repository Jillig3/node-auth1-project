const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db('users').select('user_id', 'username')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
async function findBy(filter) {
  const result = await db('users').where(filter).orderBy('user_id')
  return result
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
function findById(user_id) {
  const checkingId = db('users')
    .select('user_id', 'username')
    .where({ user_id })
    .first()
  return checkingId
}

/**
  resolves to the newly inserted user { user_id, username }
 */
async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  find,
  findBy,
  findById,
  add,
}