export const hasAdminAccess = (req, res, next) => {
  if (!req.auth) res.status(400).send('Invalid Request')
  if (!req.originalUrl.split('/').includes('admin')) {
    return next()
  }
  if (req.auth.admin) return next()
  return res.status(403).send('Resource not accessible for User')
}