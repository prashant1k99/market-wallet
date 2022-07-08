const { stripe } = require('../../../util')
const { APP_CURRENCY } = require('../../../config')
const { Product } = require('../../../model')

class WalletService {
  #LOG_IDENTIFIER
  #stripe

  constructor() {
    this.#LOG_IDENTIFIER = `WalletService_${locationId}`;
    this.#stripe = stripe
  }

  async walletSetup({
    name,
    email,
    balance,
  }, {
    city,
    country,
    line1,
    line2,
    postal_code,
    state
  }) {

  }
}

module.exports = WalletService