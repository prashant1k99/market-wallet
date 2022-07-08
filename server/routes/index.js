const express = require('express')

// const userRoute = require('./user')
const adminRoute = require('./admin')

const {
  hasAdminAccess,
  authenticate
} = require('../middleware')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

// app.use('/user', authenticate, userRoute)
app.use('/admin', authenticate, hasAdminAccess, adminRoute)
app.use('/test', (req, res) => {
  return res.status(200).send('It\'s working')
})

module.exports = app