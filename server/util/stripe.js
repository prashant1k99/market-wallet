require('dotenv/config')
const Stripe = require('stripe')

const STRIPE_KEY = process.env.STRIPE_KEY

const stripe = new Stripe(STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

exports.default = stripe