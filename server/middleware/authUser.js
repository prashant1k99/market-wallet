const { getAuth } = require('firebase-admin')

export const authenticate = (req, res, next) => {
  if (!req.headers.token) return res.status(401).send('User Not Authorized.')
  const token = req.headers.authorization.split(' ')[1] // TO extract token from Bearer
  if (!token) return res.status(401).send('Invalid Auth Token')
  getAuth
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.auth = decodedToken
      next()
    })
    .catch((err) => {
      res.status(500).send(err)
    })
}