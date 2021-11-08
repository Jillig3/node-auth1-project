const express = require('express')
const router = express.Router()
const Users = require('./users-model')
const { restricted } = require('../auth/auth-middleware')

router.get('/', restricted, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
})

module.exports = router