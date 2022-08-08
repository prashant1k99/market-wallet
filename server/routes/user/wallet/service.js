const { stripe } = require('../../../util')
const { APP_CURRENCY } = require('../../../config')
const { Wallet, Transaction } = require('../../../model')

class WalletService {
  #LOG_IDENTIFIER
  #stripe

  constructor() {
    this.#LOG_IDENTIFIER = `WalletService_${locationId}`;
    this.#stripe = stripe
  }

  /**
   * 
   * @param {string} userId 
   * @return {Promise} Promise object of { walletId, walletBalance } 
   */
  getWallet(userId) {
    return Wallet.findOne({
      userId
    }).lean()
  }

  getWalletById(walletId) {
    return Wallet.findById(walletId).lean()
  }

  getWalletTransaction(txnId) {
    return Transaction.findById(txnId).lean()
  }

  getWalletTransactions(walletId, limit, skip) {
    return Transaction.find({
      walletId
    }).limit(limit).skip(skip).lean()
  }

  /**
   * 
   * @param {String} productId
   * @param {String} walletId
   * @param {Object} info { description, meta } 
   * 
   * @return {Object} { success: true } 
   */
  async purchaseOnWallet(productId) {
    
  }

  async addWalletBalance() {}
}

module.exports = WalletService