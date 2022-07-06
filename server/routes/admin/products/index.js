const express = require('express')
const app = express()

const { validate, methodNames } = require('./validator')
const ProductController = require('./controller')

app.post('/create', validate(methodNames.CREATE_PRODUCT), ProductController.create)
app.get('/get/:productId', validate(methodNames.PRODUCT_ID), ProductController.get)
app.get('/getAll', validate(methodNames.PRODUCT_ID), ProductController.getAll)
app.get('/getActive', validate(methodNames.PRODUCT_ID), ProductController.getActive)
app.put('/update/:productId', validate(methodNames.PRODUCT_ID), ProductController.update)
app.put('/submit/:productId', validate(methodNames.PRODUCT_ID), ProductController.submit)
app.put('/disable/:productId', validate(methodNames.PRODUCT_ID), ProductController.disable)
app.delete('/delete/:productId', validate(methodNames.PRODUCT_ID), ProductController.delete)

module.exports = app