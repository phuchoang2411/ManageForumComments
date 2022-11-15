import { Post } from './models/post';
import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.get('/posts', (req: Request, res: Response) => {
//   res.send(posts);
// });

app.post('/posts/create', async (req: Request, res: Response) => {
  const postId: string = randomBytes(4).toString('hex');
  const { title } = req.body;

  const post = Post.build({ postId, title });
  await post.save();

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      postId,
      title,
    },
  });

  res.status(201).send({});
});

export { app };
