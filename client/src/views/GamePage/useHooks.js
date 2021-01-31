import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';

let socket;

const fieldTypeBoard = [0, 1, 2];
const [emptyField, xField, circleField] = fieldTypeBoard;
const symbolType = [0, 1];
const [x, elipse] = symbolType;

const winCombination = [
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

const useHooks = (id, username) => {
  const [board, setBoard] = useState([]);
  const [move, setMove] = useState(elipse);
  const [players, setPlayers] = useState([]);
  const [isGameStart, setIsGameStart] = useState(false);

  const boardRef = useRef();

  const createTheBoard = () => {
    const boardGen = [];

    for (let i = 0; i < 9; i += 1) {
      boardGen.push(emptyField);
    }

    setBoard(boardGen);
  };

  const setSettings = gameSettings => {
    const indexOfMyNickname = gameSettings.findIndex(element => element.playerName === username);
    const gameSettingsEditFormat = gameSettings;
    gameSettingsEditFormat[indexOfMyNickname].isMe = true;

    setPlayers(gameSettingsEditFormat);
    setIsGameStart(true);
  };

  const checkWin = () => {
    let win = false;

    const xBoard = board.map(e => (e === 1 ? 0 : e));
    const elipseBoard = board.map(e => (e === 2 ? 0 : e));

    winCombination.forEach(winComb => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      if (equals(winComb, xBoard)) {
        win = true;
      }

      if (equals(winComb, elipseBoard)) {
        win = true;
      }
    });

    console.log(win);

    if (win) {
      alert('WIN');
    }
  };

  const playerMove = fieldIndex => {
    const findMyPlayerSettings = players.find(element => element.isMe);
    if (findMyPlayerSettings.symbol === move) {
      const sendMove = move === 0 ? 1 : 0;
      const sendBoard = board;
      sendBoard[fieldIndex] = move + 1;

      socket.emit('move', { move: sendMove, board: sendBoard, id });

      setBoard(prev => {
        const prevEdit = prev;
        prevEdit[fieldIndex] = move + 1;
        return prevEdit;
      });
      setMove(prev => (prev === 0 ? 1 : 0));

      checkWin();
      // żądanie
    } else {
      alert('to nie jest twój ruch');
    }
  };

  useEffect(() => {
    createTheBoard();
    socket = io('http://localhost:5000');
    socket.emit('join', { id, username }, () => {
      console.log('response');
    });

    socket.on('joinOpponent', data => {
      console.log('join');
      setSettings(data);
    });

    socket.on('moveOpponent', data => {
      setMove(data.move);
      setBoard(data.board);
      checkWin();
    });
  }, []);

  return {
    board,
    isGameStart,
    players,
    move,
    playerMove,
  };
};

export default useHooks;
