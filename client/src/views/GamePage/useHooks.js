import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const API = 'http://localhost:5000';

let socket;

const fieldTypeBoard = [0, 1, 2];
const [emptyField] = fieldTypeBoard;
const symbolType = [0, 1];
const [, elipse] = symbolType;

const clearBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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

const useHooks = (roomId, username) => {
  const [board, setBoard] = useState([]);
  const [move, setMove] = useState(elipse);
  const [players, setPlayers] = useState([]);
  const [isGameStart, setIsGameStart] = useState(false);
  const [revenge, setRevenge] = useState({ showRevenge: true, users: [] });

  const createTheBoard = () => {
    const boardGen = [];
    for (let i = 0; i < 9; i += 1) {
      boardGen.push(emptyField);
    }
    setBoard(boardGen);
  };

  const checkWin = futureBoard => {
    let xBoard;
    let elipseBoard;

    if (futureBoard) {
      xBoard = futureBoard.map(e => (e === 1 ? 0 : e));
      elipseBoard = futureBoard.map(e => (e === 2 ? 0 : e));
    } else {
      xBoard = board.map(e => (e === 1 ? 0 : e));
      elipseBoard = board.map(e => (e === 2 ? 0 : e));
    }

    let win = false;

    winBoardCombination.forEach(winComb => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      if (equals(winComb, xBoard) || equals(winComb, elipseBoard)) {
        win = true;
      }
    });

    if (win) {
      setTimeout(() => {
        alert('WIN');
      }, 300);
    }
  };

  const prepareGame = gameSettings => {
    const indexOfMyPlayer = gameSettings.findIndex(element => element.userId === socket.id);
    const gameSettingsEditFormat = gameSettings;
    gameSettingsEditFormat[indexOfMyPlayer].isMe = true;

    setPlayers(gameSettingsEditFormat);
    setBoard(clearBoard);
    setRevenge({ showRevenge: false, users: [] });
    setIsGameStart(true);
  };

  const playerMove = fieldIndex => {
    const findMyPlayerSettings = players.find(element => element.isMe);
    if (findMyPlayerSettings.symbol === move) {
      const currentMove = move === 0 ? 1 : 0;
      const currentBoard = board;
      if (currentBoard[fieldIndex] === 0) {
        currentBoard[fieldIndex] = move + 1;

        socket.emit('move', { move: currentMove, board: currentBoard, roomId });

        setBoard(currentBoard);
        setMove(currentMove);

        checkWin();
      }
    } else {
      alert('to nie jest twój ruch');
    }
  };

  const preprocessingRevenge = revengesData => {
    if (revengesData.users.length === 2) {
      setRevenge({
        showRevenge: true,
        users: [...revengesData.users],
      });
      socket.emit('getGameSettings', { roomId });
    } else {
      setRevenge({
        showRevenge: true,
        users: [...revengesData.users],
      });
    }
  };

  const acceptRevenge = () => {
    socket.emit('revenges', { roomId });
  };

  useEffect(() => {
    socket = io(API);

    socket.on('prepareGame', gameSettings => {
      prepareGame(gameSettings);
    });

    socket.on('moveOpponent', ({ move: movePlayer, board: boardPlayer }) => {
      setMove(movePlayer);
      setBoard(boardPlayer);
      checkWin(boardPlayer);
    });

    socket.on('revengesAcceped', revengesData => {
      preprocessingRevenge(revengesData);
    });
  }, []);

  useEffect(() => {
    createTheBoard();
    socket.emit('join', { roomId, username }, res => {
      // TODO: jeżęli res error to wyświetlić error
    });

    socket.on('playerLeave', () => {
      console.log('player leave');
      setIsGameStart(false);
    });
  }, []);

  return {
    board,
    isGameStart,
    players,
    move,
    playerMove,
    acceptRevenge,
    revenge,
  };
};

export default useHooks;
