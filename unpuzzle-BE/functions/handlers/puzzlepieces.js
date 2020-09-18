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
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          userImage: doc.data().userImage,
          ppType: doc.data().ppType ? doc.data().ppType : null,
          ppURL: doc.data().ppURL ? doc.data().ppURL : null
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
    userImage: req.user.imageUrl,
    ppType: req.body.ppType ? req.body.ppType : null,
    ppURL: req.body.ppURL ? req.body.ppURL : null,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };

  db
    .collection('puzzlepieces')
    .add(newPuzzlePiece)
    .then(doc => {
      const resPuzzlepiece = newPuzzlePiece;
      resPuzzlepiece.puzzlepieceId = doc.id;
      res.json(resPuzzlepiece);
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
  if(req.body.body.trim() === '') 
    return res.status(400).json({ comment: 'Must not be empty'});

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
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
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
// Like a puzzle piece
exports.likePuzzlepiece = (req,res) => {
  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('puzzlepieceId', '==', req.params.puzzlepieceId).limit(1); // We do the limit function since it's a query and it's going to give us a couple of documents. limit(1) gives an array of one document

  const puzzlepieceDocument = db.doc(`/puzzlepieces/${req.params.puzzlepieceId}`);
  
  let puzzlepieceData;

  puzzlepieceDocument.get()
    .then(doc => {
      if(doc.exists){
        puzzlepieceData = doc.data();
        puzzlepieceData.puzzlepieceId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Puzzle piece not found' });
      }
    })
    .then(data => {
      if(data.empty) {
        return db.collection('likes').add({
          puzzlepieceId: req.params.puzzlepieceId,
          userHandle: req.user.handle
        })
        .then(() => {
          puzzlepieceData.likeCount++
          return puzzlepieceDocument.update({ likeCount: puzzlepieceData.likeCount });
        })
        .then(() => {
          return res.json(puzzlepieceData);
        })
      } else {
        return res.status(400).json({ error: 'Puzzle piece already liked.'})
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    })
};

exports.unlikePuzzlepiece = (req, res) => {
  const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
    .where('puzzlepieceId', '==', req.params.puzzlepieceId).limit(1); // We do the limit function since it's a query and it's going to give us a couple of documents. limit(1) gives an array of one document

  const puzzlepieceDocument = db.doc(`/puzzlepieces/${req.params.puzzlepieceId}`);
  
  let puzzlepieceData;

  puzzlepieceDocument.get()
    .then(doc => {
      if(doc.exists){
        puzzlepieceData = doc.data();
        puzzlepieceData.puzzlepieceId = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: 'Puzzle piece not found' });
      }
    })
    .then(data => {
      if(data.empty) {
        return res.status(400).json({ error: 'Puzzle piece not liked.'})
      } else {
        return db.doc(`/likes/${data.docs[0].id}`).delete()
          .then(() => {
            puzzlepieceData.likeCount--;
            return puzzlepieceDocument.update({ likeCount: puzzlepieceData.likeCount });
          })
          .then(() => {
            res.json(puzzlepieceData);
          })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    })
};
// Delete a puzzle piece
exports.deletePuzzlepiece = (req, res) => {
  const document = db.doc(`/puzzlepieces/${req.params.puzzlepieceId}`);
  document.get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'Puzzle piece not found' });
      }
      if(doc.data().userHandle !== req.user.handle){
        return res.status(403).json({ error: 'Unauthorized' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'Puzzle piece deleted. '});
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code })
    })
}