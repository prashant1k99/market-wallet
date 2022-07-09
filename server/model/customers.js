const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Wallet = require('./wallet')
const { stripe } = require('../util')
const config = require('../config')

const customerSchema = new Schema(
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

customerSchema.statics.createCustomerAndWallet = async (data) => {
  const stripeCustomer = await stripe.customers.create({
    name: data.name,
    description: `This is User belongs to and created by ${config.PROJECT_NAME}`,
    email: data.email
  })

  const currentCustomer = await new this({
    _id: data.id,
    name: data.name,
    stripeCustomerId: stripeCustomer.id
  }).save()

  const wallet = await new Wallet({
    userId: currentCustomer.id
  }).save()

  currentCustomer.wallet = wallet._id
  await currentCustomer.save()

  return currentCustomer
}

/**
 * This method is only to be used when data needs to be syncronously udpated in Stripe and DB
 * @param {name, email} data 
 * @returns 
 */
customerSchema.statics.updateCustomer = async (data) => {
  const updatedCustomer = await this.findOneAndUpdate( data.id, {
    name: data.name,
    email: data.email
  })
  await stripe.customers.update(updatedCustomer.stripeCustomerId, {
    name: data.name,
    email: data.email
  })

  return updatedCustomer
}

customerSchema.statics.deltedCustomerAndWallet = async (id) => {
  const deletedCustomer = await this.findByIdAndDelete(id)
  await Promise.all([
    stripe.customers.del(deletedCustomer.stripeCustomerId),
    Wallet.deleteOne({
      userId: id
    })
  ])
  return {
    success: true
  }
}

module.exports = mongoose.model('Customer', customerSchema)