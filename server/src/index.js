import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
// import {env} from 'process';
require('dotenv').config();

import mainSocket from './socket';

const app = express();
export const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'https://tictactoeorigin.web.app',
    methods: ['GET', 'POST'],
  },
});

mainSocket(io);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const whitelist = ['https://tictactoeorigin.web.app'];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      console.log('this orgin is correct');
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
};

// if (process.env.NODE_ENV === 'production') {
app.use(cors(corsOptions));
// } else {
// app.use(cors());
// app.use(cors(corsOptions));
// }

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.use(cors());

server.listen(process.env.PORT || 5000, () => console.log('Server is working on: 5000'));

export default app;
