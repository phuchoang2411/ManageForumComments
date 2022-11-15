import { Request, Response } from 'express';
import { Comment } from './models/comment';
import mongoose from 'mongoose';

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// app.get('/posts/:id/comments', (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId: string = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comment = Comment.build({ commentId, content, postId });
  await comment.save();

  // const comments = commentsByPostId[req.params.id] || [];

  // comments.push({ id: commentId, content, status: 'pending' });

  // commentsByPostId[req.params.id] = comments;

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      commentId: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send({});
});

app.post('/events', async (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, commentId, status, content } = data;
    // const comments: [] = commentsByPostId[postId];
    // const comment = comments.find((comment) => {
    //   return comment.id === id;
    // });
    // comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        commentId,
        content,
        postId,
        status,
      },
    });
  }

  res.send({});
});

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(4001, () => {
    console.log('Listening on port 4001');
  });
};

start();
