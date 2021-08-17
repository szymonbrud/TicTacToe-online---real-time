import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
require('dotenv').config();

import mainSocket from './socket';

const app = express();
export const server = http.createServer(app);

let io;

if (process.env.NODE_ENV === 'develop') {
  io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });
} else {
  io = require('socket.io')(server, {
    cors: {
      origin: 'https://tictactoeorigin.web.app',
      methods: ['GET', 'POST'],
    },
  });
}

mainSocket(io);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let whitelist;

if (process.env.NODE_ENV === 'develop') {
  whitelist = ['http://localhost:3000'];
} else {
  whitelist = ['https://tictactoeorigin.web.app'];
}

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      console.log('this origin is correct');
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));

server.listen(process.env.PORT || 5000, () => console.log('Server is working on: 5000'));

export default app;
