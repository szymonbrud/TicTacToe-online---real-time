import {joinRoom, removePlayer, revengesAccept, prepareRoomSettings, checkWin} from './users';

const mainSocket = (io) => {
  io.on('connect', (socket) => {
    socket.on('join', ({roomId, username}, callback) => {
      const resoult = joinRoom(roomId, username, socket.id);

      if (resoult.error) {
        callback({error: true, desc: resoult.desc});
        return;
      } else {
        console.log('aktywacja drugiejczęści');

        socket.join(roomId);

        if (resoult.users.length === 2) {
          const roomSettings = prepareRoomSettings(roomId);

          io.sockets.in(roomId).emit('prepareGame', roomSettings);
        }
      }
    });

    socket.on('move', ({roomId, move, board}) => {
      const isWin = checkWin(board, move, socket.id);
      const currentMove = move === 0 ? 1 : 0;
      io.sockets.in(roomId).emit('moveOpponent', {
        move: currentMove,
        board,
        userWin: isWin ? socket.id : null,
        winStatus: isWin,
      });
    });

    socket.on('revenges', ({roomId}) => {
      const revengesCurrentRoom = revengesAccept(roomId, socket.id);

      io.sockets.in(roomId).emit('revengesAcceped', revengesCurrentRoom);
    });

    socket.on('getGameSettings', ({roomId}) => {
      const roomSettings = prepareRoomSettings(roomId);

      io.sockets.in(roomId).emit('prepareGame', roomSettings);
    });

    socket.on('disconnect', (data) => {
      console.log('disconnect');
      const roomId = removePlayer(socket.id);
      console.log(`roomId: ${roomId}`);
      if (roomId) {
        socket.to(roomId).emit('playerLeave');
      }
    });
  });
};

export default mainSocket;
