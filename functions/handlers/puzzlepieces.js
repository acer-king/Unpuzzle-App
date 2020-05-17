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
    })
}