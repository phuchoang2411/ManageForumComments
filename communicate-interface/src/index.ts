import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

interface Event {
  type: String;
  data: {
    commentId: String;
    content: String;
    postId: String;
    status: String;
  };
}

const app = express();
app.use(bodyParser.json());

const events: Event[] = [];

app.post('/events', async (req: Request, res: Response) => {
  const event: Event = req.body;
  if (event.type == 'PostCreated') {
    await axios.post('http://query-srv:4002/events', event);
    console.log(event.type);
  }

  if (event.type == 'CommentCreated') {
    await axios.post('http://query-srv:4002/events', event);
    console.log(event.type);
  }

  events.push(event);
  res.status(200).send('ok');
});
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
