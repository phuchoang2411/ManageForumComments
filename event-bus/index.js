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

  events.push(event);
  try {
    await axios.post('http://posts-clusterip-srv:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);
    await axios.post('http://query-srv:4002/events', event);
    await axios.post('http://moderation-srv:4003/events', event);
  } catch (error) {
    console.log('Error');
  }

  res.send({ status: 'OK' });
});
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
