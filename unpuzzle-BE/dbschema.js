let db = {
  puzzlepieces: [
    {
      userHandle: 'user',
      body: 'this is a PP',
      createdAt: '2020-05-06T14:22:21.576Z',
      ppType: 'Video',
      ppURL: 'PP URL.com',
      likeCount: 23,
      commentCount: 10,
      childPuzzlePieces: [
        {
          userHandle: 'user',
          body: 'this is a PP',
          createdAt: '2020-05-06T14:22:21.576Z',
          ppType: 'Video',
          ppURL: 'PP URL.com',
          likeCount: 23,
          commentCount: 10
        }
      ],
      parentPuzzlePieces: [
        {
          userHandle: 'user',
          body: 'this is a PP',
          createdAt: '2020-05-06T14:22:21.576Z',
          ppType: 'Video',
          ppURL: 'PP URL.com',
          likeCount: 23,
          commentCount: 10
        }
      ],
      tags: [
        {
          tagNames: ['coding', 'javascript', 'node', 'react']
        }
      ]
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'slkdjflsdkfjsdlfkjsd',
      body: 'nice one mate',
      createdAt: '2020-05-06T14:22:21.576Z'
    }
  ]
};

const userDetails = {
  // Redux Data
  credentials: {
    userId: 'slskdfsldkfjslkfjdsf',
    email: 'email@email.com',
    handle: 'user',
    createdAt: '2019-11-23T20:44:39.040Z',
    imageUrl: 'image/dlsjfldkj',
    bio: 'hello, this is bio',
    website: 'https://wow.com',
    location: 'London, UK'
  },
  likes: [
    {
    userHandle: 'user',
    screamId: 'wowosdfjosdifjo'
    },
    {
      userHandle: 'user',
      screamId: 'wowosdfjosdifjo'
    }
  ]
};