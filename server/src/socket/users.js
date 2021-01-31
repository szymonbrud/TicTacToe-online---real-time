const rooms = [];
const rematch = [];

export const joinRoom = (id, username, userId) => {
  const findRoom = rooms.find((room) => room.id === id);
  if (findRoom) {
    if (findRoom.users.length === 2) {
      return {error: true, desc: 'Pokój jest pełny'};
    }
    const indexOfRoom = rooms.findIndex((room) => room.id === id);
    rooms[indexOfRoom].users.push({username, userId});
    return {id, users: rooms[indexOfRoom].users, error: false};
  } else {
    const roomData = {id, users: [{username, userId}]};
    rooms.push(roomData);
    return {...roomData, error: false};
  }
};

export const removePlayer = (userId) => {
  let indexOfPlayer = -1;
  const indexOfRoomWithPlayer = rooms.findIndex((room) =>
    room.users.map((user, userIndex) => {
      if (user.userId === userId) {
        indexOfPlayer = userIndex;
        return;
      }
    }),
  );

  if (indexOfRoomWithPlayer === -1) {
    return;
  }

  if (rooms[indexOfRoomWithPlayer].users.length === 1) {
    rooms.splice(indexOfRoomWithPlayer, 1);
  } else {
    const roomId = rooms[indexOfRoomWithPlayer].id;
    rooms[indexOfRoomWithPlayer].users.splice(indexOfPlayer, 1);
    return roomId;
  }
};

export const rematchAccept = (roomId, playerId) => {
  const rematchPlayerIndex = rematch.findIndex((e) => e.roomId === roomId);
  if (rematchPlayerIndex === -1) {
    rematch.push({roomId, players: [playerId]});
  } else {
    rematch[rematchPlayerIndex].players.push(playerId);
  }

  const rematchData = rematch.find((e) => e.roomId);
  console.log(rematchData);
  if (rematchData.players.length === 2) {
    return true;
  }
  return false;
};
