const express = require('express')

const setupRoute = require('./setup')
const transactRoute = require('./transact')
const transactionRoute = require('./transaction')
const walletRoute = require('./wallet')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use('/setup', setupRoute)
app.use('/transact', transactRoute)
app.use('/transactions', transactionRoute)
app.use('/wallet', walletRoute)

module.exports = app