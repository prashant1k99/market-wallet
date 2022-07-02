require('dotenv/config')
const mongoose = require('mongoose')
const app = require('./server')
require('./server/util/firebase')

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 3000

mongoose
  .connect(DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀  Server ready http://localhost:${PORT}`)
    })
  })
  .catch(err => console.error(err))
