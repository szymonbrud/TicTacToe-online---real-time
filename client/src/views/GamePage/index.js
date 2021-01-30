import React from 'react';
import { useParams } from 'react-router-dom';

import xIcon from 'assets/icons/xIcon.svg';
import ElipseIcon from 'assets/icons/ElipseIcon.svg';

import {
  PlayerIcon,
  PlayerInsideWrapper,
  PlayerName,
  PlayersWrapper,
  BoardWrapper,
  Field,
  WaitForOpponentWrapper,
} from './styled';

import useHooks from './useHooks';

const GamePage = () => {
  const { id, username } = useParams();
  const { board, isGameStart, players } = useHooks(id, username);

  return (
    <>
      <WaitForOpponentWrapper isGameStart={isGameStart}>
        Czekanie na przeciwnika
      </WaitForOpponentWrapper>
      <PlayersWrapper>
        {players.map((player, pIndex) => (
          <PlayerInsideWrapper isMove>
            <PlayerIcon src={player.symbol ? ElipseIcon : xIcon} />
            <PlayerName>{player.playerName}</PlayerName>
          </PlayerInsideWrapper>
        ))}
        {/* <PlayerInsideWrapper isMove>
          <PlayerIcon src={xIcon} />
          <PlayerName>małyszowki</PlayerName>
        </PlayerInsideWrapper>
        <PlayerInsideWrapper>
          <PlayerIcon src={ElipseIcon} />
          <PlayerName>kubawczyk</PlayerName>
        </PlayerInsideWrapper> */}
      </PlayersWrapper>
      <BoardWrapper>
        {board.map(field => (
          <Field>{/* // */}</Field>
        ))}
      </BoardWrapper>
    </>
  );
};

export default GamePage;
