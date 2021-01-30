// JOIN - sprawdza czy ktoś już stworzył pokój czy nie, po czym tworzy lub dołacza do zmiennej,
// sprawdza także czy dany pokój nie jest już zajęty przez 2 graczy

// MOVE - ruch gracza i przesyła go do przeciwnika

import {joinRoom} from './users';

const mainSocket = (io) => {
  io.on('connect', (socket) => {
    socket.on('join', ({id, username}, callback) => {
      const resoult = joinRoom(id, username);

      if (resoult.error) {
        callback({error: true});
        return;
      }

      socket.join(id);

      const randomNumber = Math.round(Math.random() * (1 - 0)) + 0;

      const resoultDataFormat = [
        {
          playerName: resoult.users[0],
          symbol: randomNumber,
        },
        {
          playerName: resoult.users[1],
          symbol: randomNumber === 0 ? 1 : 0,
        },
      ];

      if (resoult.users.length === 2) {
        console.log(username);
        io.sockets.in(id).emit('joinOpponent', resoultDataFormat);
      }
    });
  });
};

export default mainSocket;

// const p = [
//   {
//     playerName: 'p1',
//     symbol: 1,
//     isMe: true,
//   },
//   {
//     playerName: 'p2',
//     symbol: 2,
//     isMe: false,
//   },
// ];
