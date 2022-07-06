const { stripe } = require('../../../util')
const { APP_CURRENCY } = require('../../../config')
const { Product } = require('../../../model')

export class ProdcutService {
  #LOG_IDENTIFIER
  #stripe

  constructor() {
    this.#LOG_IDENTIFIER = `ProductService_${locationId}`;
    this.#stripe = stripe
  }

  async create({
    name,
    featuredImage,
    additionalImages,
    description,
    price
  }) {
    console.info(`${this.#LOG_IDENTIFIER} Create`);

    const newProduct = new Product({
      name,
      featuredImage,
      additionalImages,
      description,
      price: {
        amount: price
      }
    })
    const createdProduct = await newProduct.save()
    console.info(`${this.#LOG_IDENTIFIER} Product Created Successfully ${createdProduct._id}`);
    
    return createdProduct
  }

  get(productId) {
    return Product.findById(productId).lean()
  }

  getAll(skip, limit, status) {
    return Product.find({ status }).skip(skip).limit(limit).lean()
  }

  getActive(skip, limit) {
    return Product.find({
      status: 'ACTIVE'
    }).skip(skip).limit(limit).lean()
  }

  update(productId, updatedFields) {
    console.info(`${this.#LOG_IDENTIFIER} Create`);
    return Product.findByIdAndUpdate(productId, updatedFields, { lean: true })
  }

  async submit(productId) {
    console.info(`${this.#LOG_IDENTIFIER} SUBMIT`);
    const product = await Product.findById(productId)

    const stripeProduct = await this.#stripe.products.create({
      id: product.id,
      name: product.name,
      description: product.description,
      metadata: {
        featuredImage: product.featuredImage,
        additionalImages: product.additionalImages,
        price: product.price
      }
    })
    console.info(`${this.#LOG_IDENTIFIER} Stripe Product Created Successfully ${stripeProduct.id}`);
    
    const stripePrice = await this.#stripe.prics.create({
      unit_amount: product.price * 100,
      currency: APP_CURRENCY || 'usd',
      product: stripeProduct.id,
      metadata: {
        productName: product.name
      }
    })
    console.info(`${this.#LOG_IDENTIFIER} Stripe Price Created Successfully ${stripePrice.id}`);
    
    product.price.stripePriceId = stripePrice.id
    product.status = 'ACTIVE'
    await product.save()

    console.info(`${this.#LOG_IDENTIFIER}_${product.id} Product Activated Successfully`);
    return {
      success: true
    }
  }
  
  disable(productId) {
    await Product.updateOne({_id: productId}, {
      status: 'DISABLED'
    })
    await this.#stripe.producs.update({
      id: productId,
      active: false
    })

    return {
      success: true
    }
  }
  
  async delete(productId) {
    await Product.deleteOne({ _id: productId })
    await this.#stripe.products.del(productId)

    console.info(`${this.#LOG_IDENTIFIER}_${productId} Product Disabled Successfully`);
    return {
      success: true
    }
  }
}