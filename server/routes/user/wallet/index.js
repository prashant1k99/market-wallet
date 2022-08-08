const express = require('express')
const app = express()

const { validate, methodNames } = require('./validator')

app.get('/', ProductController.getAll)
app.get('/transactions', )
app.get('/transaction/:txnId', validate(methodNames.FETCH_TXN))

// Webhook from Stripe for Wallet Recharge
app.post('/webhook/wallet-recharge-sLlhiZnHAp', )

module.exports = app