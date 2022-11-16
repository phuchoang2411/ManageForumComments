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
let count = 0;

app.post('/events', async (req: Request, res: Response) => {
  const event: Event = req.body;
  if (event.type == 'PostCreated') {
    try {
      await axios.post('http://query-srv:4002/events', event);
      console.log(event.type);
    } catch (error) {
      console.log('Error');
    }
  }

  if (event.type == 'CommentCreated') {
    try {
      await axios.post('http://query-srv:4002/events', event);
      console.log(event.type);
      count++;
    } catch (error) {
      console.log('Error');
    }
  }

  events.push(event);
  console.log(count);
  res.status(200).send('ok');
});
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
