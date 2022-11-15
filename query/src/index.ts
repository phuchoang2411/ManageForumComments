import mongoose from 'mongoose';
import { Query } from './models/query';

const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

interface event {
  type: string;
  data?: {
    postId: string;
    title: string;
    commentId?: string;
    content?: string;
    status?: string;
  };
}

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = async (type: string, data: event['data']) => {
  if (type === 'PostCreated' && data) {
    console.log(type);
    const { postId, title } = data;
    const post = await Query.findOne({ postId: postId });
    if (!post) {
      const query = Query.build({ postId, title });
      await query.save();
    }
  }

  if (type === 'CommentCreated' && data) {
    const { commentId, content, postId, status } = data;
    let post = await Query.findOne({ postId: postId });
    if (post) {
      if (post.comment == undefined)
        post = Object.assign({ comment: [] }, post);
      const check = post.comment!.find(
        (element) => element.commentId == commentId
      );
      if (!check)
        post.comment!.push({
          commentId: commentId!,
          status: status!,
          content: content!,
        });

      await post.save();
    }
  }

  if (type == 'CommentUpdated' && data) {
    const { commentId, content, postId, status } = data;
    // const post = posts[postId];
    // const comment = post.comments.find((comment) => {
    //   return comment.id === id;
    // });

    // comment.status = status;
    // comment.content = content;
  }
};

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await Query.find();
  const formatPosts = Object.assign({}, posts);
  res.status(200).json(formatPosts);
  console.log(posts);
});

app.post('/events', (req: Request, res: Response) => {
  const { type, data } = req.body;
  console.log('Received Event', req.body.type);
  handleEvent(type, data);

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

  app.listen(4002, async () => {
    console.log('Listening on 4002');
    try {
      const { data } = await axios.get('http://event-bus-srv:4005/events');
      console.log(data);
      for (let event of data) {
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data);
      }
    } catch (err) {
      console.log('Fail');
    }
  });
};

start();
