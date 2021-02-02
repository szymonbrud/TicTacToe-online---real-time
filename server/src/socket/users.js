const winBoardCombination = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0],
  [2, 2, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 2, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2],
  [2, 0, 0, 2, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 2, 0, 0, 2, 0],
  [0, 0, 2, 0, 0, 2, 0, 0, 2],
  [2, 0, 0, 0, 2, 0, 0, 0, 2],
  [0, 0, 2, 0, 2, 0, 2, 0, 0],
];

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
    const roomId = rooms[indexOfRoomWithPlayer].roomId;
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
  if (revengeCurrentRoom.users.length === 2) {
    const revengeCurrentRoomIndex = revenges.findIndex((revenge) => revenge.roomId === roomId);
    revenges.splice(revengeCurrentRoomIndex, 1);
  }
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

export const checkWin = (board, move, userId) => {
  const winBoardCombination = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
  ];

  const winStatusArray = [0, 1, 2];
  const [none, winStatus, drawStatus] = winStatusArray;

  let win = none;

  winBoardCombination.forEach((winBoard) => {
    const xBoard = winBoard.map((e) => (e === 1 ? 0 : e));
    const elipseBoard = winBoard.map((e) => (e === 2 ? 0 : e));
    console.log(xBoard);

    let resolutStatus = 0;
    let numberOfFulled = 0;

    board.forEach((e) => {
      if (e !== 0) numberOfFulled = numberOfFulled + 1;
    });

    for (let mainIndex = 0; mainIndex < 9; mainIndex++) {
      if (xBoard[mainIndex] === board[mainIndex] && xBoard[mainIndex] !== 0) {
        resolutStatus = resolutStatus + 1;
      }
    }

    for (let mainIndex = 0; mainIndex < 9; mainIndex++) {
      if (elipseBoard[mainIndex] === board[mainIndex] && elipseBoard[mainIndex] !== 0) {
        resolutStatus = resolutStatus + 1;
      }
    }

    if (resolutStatus === 3) {
      win = winStatus;
    } else if (numberOfFulled === 9) {
      win = drawStatus;
    }
  });

  return win;
};
