// src/app.ts

import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import webhookController from './controllers/webhookController';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions); // Type assertion

// New syntax for Mongoose connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(webhookController);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
