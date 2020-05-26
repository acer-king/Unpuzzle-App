const functions = require('firebase-functions');
const app = require('express')();
const FirebaseAuth = require('./util/FirebaseAuth');

const { db } = require('./util/admin')

const { 
  getAllPuzzlePieces, 
  postOnePuzzlePiece, 
  getPuzzlepiece,
  commentOnPuzzlepiece,
  likePuzzlepiece,
  unlikePuzzlepiece,
  deletePuzzlepiece
} = require('./handlers/puzzlepieces');
const { 
  signup, 
  login, 
  uploadImage, 
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead
 } = require('./handlers/users');

// Scream Routes
app.get('/puzzlepieces', getAllPuzzlePieces);
app.post('/puzzlepiece', FirebaseAuth, postOnePuzzlePiece);
app.get('/puzzlepiece/:puzzlepieceId', getPuzzlepiece);
app.delete('/puzzlepiece/:puzzlepieceId', FirebaseAuth, deletePuzzlepiece);
app.get('/puzzlepiece/:puzzlepieceId/like', FirebaseAuth, likePuzzlepiece);
app.get('/puzzlepiece/:puzzlepieceId/unlike', FirebaseAuth, unlikePuzzlepiece);
app.post('/puzzlepiece/:puzzlepieceId/comment', FirebaseAuth, commentOnPuzzlepiece);


// User Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FirebaseAuth, uploadImage);
app.post('/user', FirebaseAuth, addUserDetails);
app.get('/user', FirebaseAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', markNotificationsRead);

exports.api = functions.region('us-east1').https.onRequest(app);

exports.createNotificationOnLike = functions
.region('us-east1')
.firestore.document('likes/{id}')
 .onCreate((snapshot) => {
   db.doc(`/puzzlepieces/${snapshot.data().puzzlepieceId}`).get()
    .then(doc => {
      if(doc.exists){
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'like',
          read: false,
          puzzlepieceId: doc.id
        });
      }
    })
    .then(() => {
      return;
    })
    .catch(err => {
      console.error(err);
      return;
    })
 });

exports.deleteNotificationOnUnlike = functions
.region('us-east1')
.firestore.document('likes/{id}')
.onDelete((snapshot) => {
  db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .then(() => {
      return;
    })
    .catch(err => {
      console.log(err);
      return;
    })
})

exports.createNotificationOnComment = functions
.region('us-east1')
.firestore.document('comments/{id}')
.onCreate((snapshot) => {
  db.doc(`/puzzlepieces/${snapshot.data().puzzlepieceId}`).get()
    .then(doc => {
      if(doc.exists){
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'comment',
          read: false,
          puzzlepieceId: doc.id
        });
      }
    })
    .then(() => {
      return;
    })
    .catch(err => {
      console.error(err);
      return;
    })
})

/*
Lessons learned:
- Request has a body object, under which is the key "body" from the "puzzlepieces" collection in Firebase.
- Http Status 201 means resource created
*/