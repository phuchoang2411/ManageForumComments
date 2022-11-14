import mongoose from 'mongoose';
import { app } from './app';

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
  app.listen(4000, () => {
    console.log('v1000');
    console.log('Listening on port 4000');
  });
};

start();
