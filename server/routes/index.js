const express = require('express')

const userRoute = require('./user')
const adminRoute = require('./admin')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use('/user', userRoute)
app.use('/admin', adminRoute)

module.exports = app