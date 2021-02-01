const rooms = [];
const revenges = [];

export const joinRoom = (roomId, username, userId) => {
  const existRoom = rooms.find((room) => room.roomId === roomId);

  if (existRoom) {
    if (existRoom.users.length === 2) {
      return {error: true, desc: 'Pokój jest pełny'};
    }
    const indexOfExistRoom = rooms.findIndex((room) => room.roomId === roomId);
    rooms[indexOfExistRoom].users.push({username, userId});
    return {roomId, users: rooms[indexOfExistRoom].users, error: false};
  } else {
    const roomData = {roomId, users: [{username, userId}]};
    rooms.push(roomData);
    return {...roomData, error: false};
  }
};

// TODO: zedytowac remove player - review
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

export const revengesAccept = (roomId, userId) => {
  const revengeRoomIndex = revenges.findIndex((revenges) => revenges.roomId === roomId);
  if (revengeRoomIndex === -1) {
    revenges.push({roomId, users: [userId]});
  } else {
    revenges[revengeRoomIndex].users.push(userId);
  }

  const revengeCurrentRoom = revenges.find((revenge) => revenge.roomId === roomId);
  return revengeCurrentRoom;
};

export const prepareRoomSettings = (roomId) => {
  const roomSettings = rooms.find((room) => room.roomId === roomId);

  const whichPlayerStart = Math.round(Math.random() * (1 - 0)) + 0;

  const resoultRoomSettingsFormat = [
    {
      userId: roomSettings.users[0].userId,
      username: roomSettings.users[0].username,
      symbol: whichPlayerStart,
    },
    {
      userId: roomSettings.users[1].userId,
      username: roomSettings.users[1].username,
      symbol: whichPlayerStart === 0 ? 1 : 0,
    },
  ];

  return resoultRoomSettingsFormat;
};
