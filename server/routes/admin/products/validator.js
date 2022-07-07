const { body, param, query } = require('express-validator');

const methodNames = {
  CREATE_PRODUCT: 'createProduct',
  PRODUCT_ID: 'productId',
  FETCH_ALL: 'fetchAllProduct',
  UPDATE_PRODUCT: 'updateProduct'
}

Object.freeze(methodNames)

const createProduct = () => {
  const fields = ['name', 'featuredImage', 'additionalImages', 'description', 'price']
  return fields.map(field => {
    if (!['price', 'additionalImages'].includes(field)) {
      return body(field).isString().optional()
    } else {
      return field === 'price' ? body('price').isNumeric().optional() : body('price').isArray().optional()
    }
  });
};

const productId = () => [
  param('productId').isString().notEmpty()
]

const fetchAllProduct = () => [
  query('skip').isNumeric().optional(),
  query('limit').isNumeric().optional(),
  query('status').optional().custom(value => ['DRAFT', 'ACTIVE', 'DISABLED'].includes(value))
]

const updateProduct = () => [
  ...productId(),
  ...createProduct()
]

export function validate(method) {
  switch (method) {
    case methodNames.CREATE_PRODUCT: {
      return createProduct();
    }
    case methodNames.PRODUCT_ID: {
      return productId();
    }
    case methodNames.FETCH_ALL: {
      return fetchAllProduct();
    }
    case methodNames.UPDATE_PRODUCT: {
      return updateProduct();
    }
    default: {
      log.warn(`No validation for method --> ${method}`);
      return [];
    }
  }
}