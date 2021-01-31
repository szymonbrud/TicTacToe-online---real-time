// JOIN - sprawdza czy ktoś już stworzył pokój czy nie, po czym tworzy lub dołacza do zmiennej,
// sprawdza także czy dany pokój nie jest już zajęty przez 2 graczy
// wychodzenie graczy i usuwanie ich z bazy

// MOVE - ruch gracza i przesyła go do przeciwnika

import {joinRoom, removePlayer, rematchAccept} from './users';

const mainSocket = (io) => {
  io.on('connect', (socket) => {
    socket.on('join', ({id, username}, callback) => {
      const resoult = joinRoom(id, username, socket.id);

      if (resoult.error) {
        callback({error: true});
        return;
      }

      socket.join(id);

      if (resoult.users.length === 2) {
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

        io.sockets.in(id).emit('joinOpponent', resoultDataFormat);
      }
    });

    socket.on('move', ({id, move, board}) => {
      socket.to(id).emit('moveOpponent', {move, board});
    });

    socket.on('acceptRematch', ({roomId}) => {
      const isBothPlayersAcceped = rematchAccept(roomId, socket.id);
      console.log(isBothPlayersAcceped);
      io.sockets
        .in(roomId)
        .emit('opponentAcceptRematch', {isBoth: isBothPlayersAcceped, playerId: socket.id});
    });

    socket.on('disconnect', (data) => {
      const roomId = removePlayer(socket.id);
      socket.to(roomId).emit('playerLeave');
    });
  });
};

export default mainSocket;
