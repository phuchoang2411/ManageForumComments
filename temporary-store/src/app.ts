import { Temp } from './models/temp';
import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/temp', async (req: Request, res: Response) => {
  const commentId: string = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const temp = Temp.build({ commentId, content, postId });
  await temp.save();

  console.log('Temporary store created!');
  res.status(201).send('Temporary store created!');
});

export { app };
