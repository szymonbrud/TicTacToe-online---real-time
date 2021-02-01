import {joinRoom, removePlayer, revengesAccept, prepareRoomSettings} from './users';

const mainSocket = (io) => {
  io.on('connect', (socket) => {
    socket.on('join', ({roomId, username}, callback) => {
      const resoult = joinRoom(roomId, username, socket.id);

      if (resoult.error) {
        callback({error: true, desc: resoult.desc});
        return;
      }

      socket.join(roomId);

      if (resoult.users.length === 2) {
        const roomSettings = prepareRoomSettings(roomId);

        io.sockets.in(roomId).emit('prepareGame', roomSettings);
      }
    });

    socket.on('move', ({roomId, move, board}) => {
      socket.to(roomId).emit('moveOpponent', {move, board});
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
      const roomId = removePlayer(socket.id);
      socket.to(roomId).emit('playerLeave');
    });
  });
};

export default mainSocket;
