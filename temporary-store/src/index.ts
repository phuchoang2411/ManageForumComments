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
  app.listen(5001, () => {
    console.log('v1002');
    console.log('Listening on port 5001');
  });
};

start();
