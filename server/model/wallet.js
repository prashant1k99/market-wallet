const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    balance: {
      type: Schema.Types.Decimal128,
      get: (balance) => {
        return parseFloat(balance.toString())
      }
    },
    cards: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
)

walletSchema.index({ userId: 1 })

module.exports = mongoose.model('Wallet', walletSchema)