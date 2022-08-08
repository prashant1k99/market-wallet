const ProductService = require('./service')
const { handleError } = require('../../../util')

class ProductController {
  async get(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProductService()
      const product = await productService.get(productId)
      if (!product) return res.status(404).send({
        msg: 'Product Not Found'
      })
      return res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async getWalletTransactions(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProductService()
      const product = await productService.get(productId)
      if (!product) return res.status(404).send({
        msg: 'Product Not Found'
      })
      return res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async getTransaction(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProductService()
      const product = await productService.get(productId)
      if (!product) return res.status(404).send({
        msg: 'Product Not Found'
      })
      return res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }
}

module.exports = ProductController