const express = require('express')

const userRoute = require('./user')
const adminRoute = require('./admin')

const {
  hasAdminAccess,
  authenticate
} = require('../middleware')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use('/user', authenticate, hasAdminAccess, userRoute)
app.use('/admin', authenticate, adminRoute)

module.exports = app