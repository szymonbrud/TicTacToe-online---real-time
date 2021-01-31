import io from 'socket.io-client';
import { useEffect, useState } from 'react';

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
  const [showRematch, setShowRematch] = useState(true);
  const [playersAcceptedRematch, setPlayersAcceptedRematch] = useState([]);

  const createTheBoard = () => {
    const boardGen = [];

    for (let i = 0; i < 9; i += 1) {
      boardGen.push(emptyField);
    }

    setBoard(boardGen);
  };

  const setSettings = gameSettings => {
    console.log(gameSettings);

    const indexOfMyPlayer = gameSettings.findIndex(
      element => element.playerName.userId === socket.id,
    );
    const gameSettingsEditFormat = gameSettings;
    gameSettingsEditFormat[indexOfMyPlayer].isMe = true;

    setPlayers(gameSettingsEditFormat);
    setIsGameStart(true);
  };

  const checkWin = futureBoard => {
    let win = false;

    let xBoard;
    let elipseBoard;

    if (futureBoard) {
      xBoard = futureBoard.map(e => (e === 1 ? 0 : e));
      elipseBoard = futureBoard.map(e => (e === 2 ? 0 : e));
    } else {
      xBoard = board.map(e => (e === 1 ? 0 : e));
      elipseBoard = board.map(e => (e === 2 ? 0 : e));
    }

    winCombination.forEach(winComb => {
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      if (equals(winComb, xBoard)) {
        win = true;
      }

      if (equals(winComb, elipseBoard)) {
        win = true;
      }
    });

    if (win) {
      setTimeout(() => {
        alert('WIN');
      }, 300);
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

  const acceptRematch = () => {
    socket.emit('acceptRematch', { roomId: id });
    // console.log(playersAcceptedRematch);
    // if (playersAcceptedRematch.length === 1) {
    //   setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    //   setShowRematch(false);
    //   setIsGameStart(true);
    // }
    // setPlayersAcceptedRematch(prev => [...prev, socket.id]);
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
      console.log(data);

      setMove(data.move);
      setBoard(data.board);

      checkWin(data.board);
    });

    socket.on('playerLeave', () => {
      console.log('player leave');
      setIsGameStart(false);
    });

    socket.on('opponentAcceptRematch', ({ isBoth, playerId }) => {
      if (isBoth) {
        setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setShowRematch(false);
        setIsGameStart(true);
      } else {
        setPlayersAcceptedRematch(prev => [...prev, playerId]);
      }
    });
  }, []);

  return {
    board,
    isGameStart,
    players,
    move,
    playerMove,
    showRematch,
    acceptRematch,
    playersAcceptedRematch,
  };
};

export default useHooks;
