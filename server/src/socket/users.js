const rooms = [];

export const joinRoom = (id, username) => {
  const findRoom = rooms.find((room) => room.id === id);
  if (findRoom) {
    if (findRoom.users.length === 2) {
      return {error: true};
    }
    const indexOfRoom = rooms.findIndex((room) => room.id === id);
    rooms[indexOfRoom].users.push(username);
    return {id, users: rooms[indexOfRoom].users, error: false};
  } else {
    const roomData = {id, users: [username]};
    rooms.push(roomData);
    return {...roomData, error: false};
  }
};
