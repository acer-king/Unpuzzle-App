const functions = require('firebase-functions');
const app = require('express')();
const FirebaseAuth = require('./util/FirebaseAuth');

const cors = require('cors');
app.use(cors());

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

// Puzzle Routes
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
   return db.doc(`/puzzlepieces/${snapshot.data().puzzlepieceId}`).get()
    .then(doc => {
      if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
    .catch(err =>
      console.error(err));
 });

exports.deleteNotificationOnUnlike = functions
.region('us-east1')
.firestore.document('likes/{id}')
.onDelete((snapshot) => {
  return db.doc(`/notifications/${snapshot.id}`)
    .delete()
    .catch(err => {
      console.log(err);
      return;
    })
})

exports.createNotificationOnComment = functions
.region('us-east1')
.firestore.document('comments/{id}')
.onCreate((snapshot) => {
  return db.doc(`/puzzlepieces/${snapshot.data().puzzlepieceId}`).get()
    .then(doc => {
      if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
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
    .catch(err => {
      console.error(err);
      return;
    })
})

exports.onUserImageChange = functions
  .region('us-east1')
  .firestore.document('/users/{userId}')
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());
    if(change.before.data().imageUrl !== change.after.data().imageUrl){
      console.log('Image has changed')
      const batch = db.batch();
      return db.collection('puzzlepieces').where('userHandle', '==', change.before.data().handle).get()
        .then((data) => {
          data.forEach(doc => {
            const puzzlepiece = db.doc(`/puzzlepieces/${doc.id}`);
            batch.update(puzzlepiece, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onPuzzlepieceDelete = functions
.region('us-east1')
.firestore.document('/puzzlepieces/{puzzlepieceId}')
.onDelete((snapshot, context) => {
  const puzzlepieceId = context.params.puzzlepieceId;
  const batch = db.batch();
  return db.collection('comments').where('puzzlepieceId', '==', puzzlepieceId).get()
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/comments/${doc.id}`));
      })
      return db.collection('likes').where('puzzlepieceId', '==', puzzlepieceId).get();
    })
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/likes/${doc.id}`));
      })
      return db.collection('notifications').where('puzzlepieceId', '==', puzzlepieceId).get();
    })
    .then(data => {
      data.forEach(doc => {
        batch.delete(db.doc(`/notifications/${doc.id}`));
      })
      return batch.commit();
    })
    .catch(err => console.error(err));
})

/*
Lessons learned:
- Request has a body object, under which is the key "body" from the "puzzlepieces" collection in Firebase.
- Http Status 201 means resource created
*/