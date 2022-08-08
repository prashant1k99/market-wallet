const { body, param, query } = require('express-validator');

const methodNames = {
  FETCH_TXN: 'fetchTxn',
}

Object.freeze(methodNames)

const fetchTxn = () => [
  param('txnId').isString().notEmpty()
]

function validate(method) {
  switch (method) {
    case methodNames.FETCH_TXN: {
      return fetchTxn();
    }
    default: {
      log.warn(`No validation for method --> ${method}`);
      return [];
    }
  }
}

module.exports = {
  validate,
  methodNames
}