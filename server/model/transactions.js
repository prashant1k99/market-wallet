const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema(
  {
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    txnType: {
      type: String,
      enum: ['DEBIT', 'CREDIT'],
      default: 'DEBIT'
    },
    amount: {
      type: Schema.Types.Decimal128,
      get: (balance) => {
        return parseFloat(balance.toString())
      },
      default: 0
    },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    description: String,
    meta: Object,
    prevBalance: {
      type: Schema.Types.Decimal128,
      get: (balance) => {
        return parseFloat(balance.toString())
      },
      default: 0
    },
    nextBalance: {
      type: Schema.Types.Decimal128,
      get: (balance) => {
        return parseFloat(balance.toString())
      },
      default: 0
    }
  },
  {
    timestamps: true
  }
)

transactionSchema.index({ walletId: 1 })

module.exports = mongoose.model('Transaction', transactionSchema)