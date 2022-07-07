const express = require('express')

const productRoute = require('./products')
const app = express()

app.use('/product', productRoute)

module.exports = app