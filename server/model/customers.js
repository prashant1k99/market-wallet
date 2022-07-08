const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    stripeCustomerId: String,
    shippingAddresses: [
      { type: Schema.Types.ObjectId, ref: 'Address' }
    ],
    billingAddresses: [
      { type: Schema.Types.ObjectId, ref: 'Address' }
    ],
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' }
  },
  {
    timestamps: true
  }
)

// TODO: Perform CRUD for Customer in Stripe here

module.exports = mongoose.model('Product', productSchema)