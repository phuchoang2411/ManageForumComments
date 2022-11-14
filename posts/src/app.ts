import { Post } from './models/post';
import { Request, Response } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.get('/posts', (req: Request, res: Response) => {
//   res.send(posts);
// });

app.post('/posts/create', async (req: Request, res: Response) => {
  const id: string = randomBytes(4).toString('hex');
  const { title } = req.body;

  const post = Post.build({ id, title });
  await post.save();

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send({});
});

app.post('/events', (req: Request, res: Response) => {
  console.log('Received Event', req.body.type);
  res.send({});
});

export { app };
