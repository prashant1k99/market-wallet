const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['DRAFT', 'ACTIVE', 'DISABLED'],
      default: 'DRAFT'
    },
    featuredImage: String,
    additionalImages: [String],
    description: String,
    price: {
      amount: Number,
      stripePriceId: String
    },
    stripeProductId: String
  },
  {
    timestamps: true
  }
)

productSchema.index({ status: 1 })

module.exports = mongoose.model('Product', productSchema)