const { hasAdminAccess } = require('./accessibility')
const { authenticate } = require('./authUser')

module.exports = {
  hasAdminAccess,
  authenticate
}