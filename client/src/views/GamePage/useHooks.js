import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import gsap from 'gsap';

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
  const [revenge, setRevenge] = useState({ showRevenge: false, users: [] });
  const [mySocketId, setMySocketId] = useState('');
  const [winStatus, setWinStatus] = useState(0);

  const revengeButtonRef = useRef();

  const history = useHistory();

  // const checkWin = (futureBoard, z) => {
  //   let xBoard;
  //   let elipseBoard;

  //   if (futureBoard) {
  //     xBoard = futureBoard.map(e => (e === 1 ? 0 : e));
  //     elipseBoard = futureBoard.map(e => (e === 2 ? 0 : e));
  //   } else {
  //     xBoard = board.map(e => (e === 1 ? 0 : e));
  //     elipseBoard = board.map(e => (e === 2 ? 0 : e));
  //   }

  //   let win = false;

  //   winBoardCombination.forEach(winComb => {
  //     const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  //     if (equals(winComb, xBoard)) {
  //       console.log(z);
  //       console.log(players);
  //       const pFind = players.find(p => p.userId === mySocketId);
  //       console.log(pFind);
  //       // console.log(players.symbol === 1 ? 'wygrałeś' : 'przegrałeś');

  //       win = true;
  //     }

  //     if (equals(winComb, elipseBoard)) {
  //       console.log(z);
  //       console.log(players);
  //       const pFind = players.find(p => p.userId === mySocketId);
  //       console.log(pFind);
  //       // console.log('o won');
  //       // console.log(players.symbol === 2 ? 'wygrałeś' : 'przegrałeś');
  //       win = true;
  //     }
  //   });

  //   if (win) {
  //     setTimeout(() => {
  //       setRevenge({ showRevenge: true, users: [] });
  //     }, 300);
  //   }
  // };

  const prepareGame = gameSettings => {
    const indexOfMyPlayer = gameSettings.findIndex(element => element.userId === socket.id);
    const gameSettingsEditFormat = gameSettings;
    gameSettingsEditFormat[indexOfMyPlayer].isMe = true;

    setMySocketId(socket.id);
    setPlayers(gameSettingsEditFormat);
    setRevenge({ showRevenge: false, users: [] });
    setWinStatus(0);

    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setIsGameStart(true);
  };

  const playerMove = fieldIndex => {
    const findMyPlayerSettings = players.find(element => element.isMe);
    if (findMyPlayerSettings.symbol === move) {
      const currentBoard = board;
      if (currentBoard[fieldIndex] === 0) {
        currentBoard[fieldIndex] = move + 1;

        socket.emit('move', { move, board: currentBoard, roomId });

        const currentMove = move === 0 ? 1 : 0;
        setBoard(currentBoard);
        setMove(currentMove);

        // checkWin();
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
    if (!revenge.users.includes(socket.id)) {
      socket.emit('revenges', { roomId });

      gsap.to(revengeButtonRef.current, 0.15, {
        background: '#000',
        color: '#fff',
        scale: 1.1,
      });

      gsap.to(revengeButtonRef.current, 0.15, {
        scale: 1,
        delay: 0.15,
      });
    }
  };

  useEffect(() => {
    socket = io(API);

    socket.on('prepareGame', gameSettings => {
      prepareGame(gameSettings);
    });

    socket.on(
      'moveOpponent',
      ({ move: movePlayer, board: boardPlayer, userWin, winStatus: winStatusE }) => {
        setMove(movePlayer);
        setBoard(boardPlayer);
        if (winStatusE === 1) {
          if (userWin === socket.id) {
            setWinStatus(1);
          } else {
            setWinStatus(2);
          }

          setTimeout(() => {
            setRevenge({ showRevenge: true, users: [] });
          }, 2000);
        }

        if (winStatusE === 2) {
          setWinStatus(3);

          setTimeout(() => {
            setRevenge({ showRevenge: true, users: [] });
          }, 2000);
        }
        // if (userWin) {
        //   if (userWin === socket.id) {
        //     setWinStatus(1);
        //   } else {
        //     setWinStatus(2);
        //   }

        // }
        // checkWin(boardPlayer, 'wyw');
      },
    );

    socket.on('revengesAcceped', revengesData => {
      preprocessingRevenge(revengesData);
    });
  }, []);

  useEffect(() => {
    setBoard(clearBoard);
    socket.emit('join', { roomId, username }, res => {
      history.push('/error');
      // TODO: jeżęli res error to wyświetlić error
    });

    socket.on('playerLeave', () => {
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
    revengeButtonRef,
    mySocketId,
    winStatus,
  };
};

export default useHooks;
