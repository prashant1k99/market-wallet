const ProdcutService = require('./service')
const { handleError } = require('../../../util')

class ProductController {
  async create(req, res) {
    try {
      const {
        name,
        featuredImage,
        additionalImages,
        description,
        price
      } = req.body
      const productService = new ProdcutService()
      const createdProduct = await productService.create({
        name,
        featuredImage,
        additionalImages,
        description,
        price
      })
      return res.status(201).send(createdProduct)
    } catch (err) {
      handleError(err, res)
    }
  }

  async get(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProdcutService()
      const product = await productService.get(productId)
      if (!product) return res.status(404).send({
        msg: 'Product Not Found'
      })
      return res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async getAll(req, res) {
    try {
      const { skip, limit, status } = req.query;
      const productService = new ProdcutService()
      const products = await productService.getAll(skip, limit, status)
      return res.status(200).send(products)
    } catch (err) {
      handleError(err, res)
    }
  }
  
  async getActive(req, res) {
    try {
      const { skip, limit, status } = req.query;
      const productService = new ProdcutService()
      const products = await productService.getActive(skip, limit, status)
      return res.status(200).send(products)
    } catch (err) {
      handleError(err, res)
    }
  }

  async update(req, res) {
    try {
      const { productId } = req.params;
      const {
        name,
        featuredImage,
        additionalImages,
        description,
        price
      } = req.body
      const productService = new ProdcutService()
      const product = await productService.update(productId, {
        name,
        featuredImage,
        additionalImages,
        description,
        price
      })
      if (!product) return res.status(404).send({
        msg: 'Product Not Found'
      })
      return res.status(201).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async submit(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProdcutService()
      const status = await productService.submit(productId)
      if (!status) return res.status(404).send({
        msg: 'Unable to Submit Product'
      })
      return res.status(200).send(status)
    } catch (err) {
      handleError(err, res)
    }
  }

  async disable(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProdcutService()
      const status = await productService.disable(productId)
      if (!status) return res.status(404).send({
        msg: 'Unable to disable Product, please try again'
      })
      return res.status(200).send(status)
    } catch (err) {
      handleError(err, res)
    }
  }

  async delete(req, res) {
    try {
      const { productId } = req.params;
      const productService = new ProdcutService()
      const status = await productService.disable(productId)
      if (!status) return res.status(404).send({
        msg: 'Unable to delete Product, please try again'
      })
      return res.status(200).send(status)
    } catch (err) {
      handleError(err, res)
    }
  }
}

module.exports = ProductController