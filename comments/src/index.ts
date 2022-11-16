import express, { Request, Response } from 'express';
import { Comment } from './models/comment';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/comments', async (req: Request, res: Response) => {
  const commentId: string = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comment = Comment.build({ commentId, content, postId });
  await comment.save();

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
