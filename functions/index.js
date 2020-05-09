const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp({
  credential: admin.credential.cert(require('./keys/admin.json'))
});

const config = {
  apiKey: "AIzaSyCbWDnoeLiCrBL1TLdxtu3u2zmKvvPNhnM",
  authDomain: "unpuzzle-ad500.firebaseapp.com",
  databaseURL: "https://unpuzzle-ad500.firebaseio.com",
  projectId: "unpuzzle-ad500",
  storageBucket: "unpuzzle-ad500.appspot.com",
  messagingSenderId: "392678471254",
  appId: "1:392678471254:web:63e3e0fc235d47ceae6df7"
};

const db = admin.firestore();

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/puzzlepieces', (req, res) => {
  db
    .collection('puzzlepieces')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let puzzlepieces = [];
      data.forEach((doc) => {
        puzzlepieces.push({
          puzzlepieceId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          ppType: doc.data().ppType,
          ppURL: doc.data().ppURL,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(puzzlepieces);
    })
    .catch(err => console.error(err))
})


app.post('/puzzlepiece', (req, res) => {
  const newPuzzlePiece = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    ppType: req.body.ppType,
    ppURL: req.body.ppURL,
    createdAt: new Date().toISOString()
  };

  db
    .collection('puzzlepieces')
    .add(newPuzzlePiece)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully.`});
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong.' });
      console.error(err);
    })
});

// Sign Up Route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

// Validate Data
  let token, usdId;
  db
    .doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'This handle is already taken' });
      } else {
        return firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      // if we get here that means we have our user created
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId // userId = userId: userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch(err => {
      console.error(err);
      if(err.code === 'auth/email-already-in-use') {
        return res.status(400).json({email: 'Email already in use'})
      } else {
        return res.status(500).json({ error: err.code });
      }
    })
})

exports.api = functions.https.onRequest(app);

/*
Lessons learned:
- Request has a body object, under which is the key "body" from the "puzzlepieces" collection in Firebase.
- Http Status 201 means resource created
*/