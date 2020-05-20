const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./keys/admin.json')),
  storageBucket: 'unpuzzle-ad500.appspot.com'
  //databaseURL: "https://unpuzzle-ad500.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };