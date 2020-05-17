const functions = require('firebase-functions');

const app = require('express')();

const FirebaseAuth = require('./util/FirebaseAuth')

const { getAllPuzzlePieces, postOnePuzzlePiece } = require('./handlers/puzzlepieces')
const { signup, login } = require('./handlers/users');

// PP Routes
app.get('/puzzlepieces', getAllPuzzlePieces)
app.post('/puzzlepiece', FirebaseAuth, postOnePuzzlePiece);

// Users routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);

/*
Lessons learned:
- Request has a body object, under which is the key "body" from the "puzzlepieces" collection in Firebase.
- Http Status 201 means resource created
*/