import io from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket;

const fieldType = [0, 1, 2];
const [emptyField, xField, circleField] = fieldType;

const useHooks = (id, username) => {
  const [board, setBoard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isGameStart, setIsGameStart] = useState(false);

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
  }, []);

  return {
    board,
    isGameStart,
    players,
  };
};

export default useHooks;
