const { db } = require('../util/admin');

exports.getAllPuzzlePieces = (req, res) => {
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
          ppType: doc.data().ppType ? doc.data().ppType : null,
          ppURL: doc.data().ppURL ? doc.data().ppURL : null,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(puzzlepieces);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code })
    });
}

exports.postOnePuzzlePiece = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Puzzle Piece content must not be empty'})  
  }
  
  const newPuzzlePiece = {
    body: req.body.body,
    userHandle: req.user.handle,
    ppType: req.body.ppType ? req.body.ppType : null,
    ppURL: req.body.ppURL ? req.body.ppURL : null,
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
    });
};
// Fetch one puzzle piece
exports.getPuzzlepiece = (req, res) => {
  let puzzlepieceData = {};
  db.doc(`/puzzlepieces/${req.params.puzzlepieceId}`)
    .get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'Puzzle piece not found' })
      }
      puzzlepieceData = doc.data();
      puzzlepieceData.puzzlepieceId = doc.id;
      return db
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .where('puzzlepieceId', '==', req.params.puzzlepieceId)
      .get();
    })
    .then(data => {
      puzzlepieceData.comments = [];
      data.forEach(doc => {
        puzzlepieceData.comments.push(doc.data());
      });
      return res.json(puzzlepieceData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    })
};
// Comment on a Puzzle Piece
exports.commentOnPuzzlepiece = (req, res) => {
  if(req.body.body.trim() === '') return res.status(400).json({ error: 'Must not be empty'});

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    puzzlepieceId: req.params.puzzlepieceId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };

  db.doc(`/puzzlepieces/${req.params.puzzlepieceId}`)
    .get()
    .then(doc => {
      if(!doc.exists){
        return res.status(404).json({ error: 'PP not found' })
      }
      return db.collection('comments').add(newComment);
    })
    .then(() => {
      res.json(newComment)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    })
}