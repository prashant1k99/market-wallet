const admin = require('firebase-admin')
const firebaseCreds = require('../firebase_admin_service_account.json')

admin.initializeApp({
  credential: admin.credential.cert(firebaseCreds)
});