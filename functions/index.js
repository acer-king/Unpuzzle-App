const functions = require('firebase-functions');

const app = require('express')();

const FirebaseAuth = require('./util/FirebaseAuth');

const { 
  getAllPuzzlePieces, 
  postOnePuzzlePiece, 
  getPuzzlepiece,
  commentOnPuzzlepiece
} = require('./handlers/puzzlepieces');
const { 
  signup, 
  login, 
  uploadImage, 
  addUserDetails,
  getAuthenticatedUser
 } = require('./handlers/users');

// Scream Routes
app.get('/puzzlepieces', getAllPuzzlePieces);
app.post('/puzzlepiece', FirebaseAuth, postOnePuzzlePiece);
app.get('/puzzlepiece/:puzzlepieceId', getPuzzlepiece);
// TODO: delete a PP
// TODO: Like a PP
app.post('/puzzlepiece/:puzzlepieceId/comment', FirebaseAuth, commentOnPuzzlepiece)


// User Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FirebaseAuth, uploadImage);
app.post('/user', FirebaseAuth, addUserDetails);
app.get('/user', FirebaseAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);

/*
Lessons learned:
- Request has a body object, under which is the key "body" from the "puzzlepieces" collection in Firebase.
- Http Status 201 means resource created
*/