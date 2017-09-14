'use strict';

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import auth from './routes/auth';

const app = express();

// connect to database
mongoose.connect('mongodb://localhost/bookworm', { useMongoClient: true });

app.use('api/auth', auth);

// app.post('/api/auth', (req, res) => {
//   res.status(400).json({ errors: { global: 'invalid credentials' }});
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Server up at localhost: 8080'));
