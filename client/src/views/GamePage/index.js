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
  FieldSymbolImage,
} from './styled';

import useHooks from './useHooks';

const GamePage = () => {
  const { id, username } = useParams();
  const { board, isGameStart, players, move, playerMove, boardRef } = useHooks(id, username);

  return (
    <>
      <WaitForOpponentWrapper isGameStart={isGameStart}>
        Czekanie na przeciwnika
      </WaitForOpponentWrapper>
      <PlayersWrapper>
        {players.map((player, pIndex) => (
          <PlayerInsideWrapper isMove={player.symbol === move}>
            <PlayerIcon src={player.symbol ? ElipseIcon : xIcon} />
            <PlayerName>{player.playerName}</PlayerName>
          </PlayerInsideWrapper>
        ))}
      </PlayersWrapper>
      <BoardWrapper ref={boardRef}>
        {board.map((field, fieldIndex) => (
          <Field onClick={() => playerMove(fieldIndex)}>
            {field !== 0 && field === 1 ? (
              <FieldSymbolImage src={xIcon} alt="x" />
            ) : (
              field === 2 && <FieldSymbolImage src={ElipseIcon} alt="o" />
            )}
          </Field>
        ))}
      </BoardWrapper>
    </>
  );
};

export default GamePage;
