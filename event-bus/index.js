const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
//const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//app.use(cors());

const events = [];

app.post('/events', async (req, res) => {
  const event = req.body;
  if (event.type == 'PostCreated') {
    try {
      await axios.post('http://query-srv:4002/events', event);
      console.log(event.type);
    } catch (error) {
      console.log('Error');
    }
  }

  console.log(event.type);
  if (event.type == 'CommentCreated') {
    try {
      await axios.post('http://query-srv:4002/events', event);
      console.log(event.type);
    } catch (error) {
      console.log('Error');
    }
  }

  events.push(event);

  res.send({ status: 'OK' });
});
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
