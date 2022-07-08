const express = require('express')

const routes = require('./routes')

const app = express()

app.disable('x-powered-by')

app.use('/api', routes)
app.use('/ping', (req, res) => {
  res.status(200).send('Working')
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'))
  // To Handle SPA
  app.get('/admin/*', (_, res) => res.sendFile(__dirname + '/public/admin/index.html'))
  app.get(/.*/, (_, res) => res.sendFile(__dirname + '/public/client/index.html'))
} else {
  app.use('/', (_, res) => res.send('This Route will be used by UI in Production'))
}

module.exports = app
