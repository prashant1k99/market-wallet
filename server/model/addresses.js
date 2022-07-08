const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema(
  {
    city: String,
    country: String,
    line1: String,
    line2: String,
    postal_code: Number,
    state: String,
    userId: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Address', addressSchema)