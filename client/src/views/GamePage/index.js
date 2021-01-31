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
  RematchButton,
  RematchText,
  RematchWrapper,
  RematchPlayerName,
} from './styled';

import useHooks from './useHooks';

const GamePage = () => {
  const { id, username } = useParams();
  const {
    board,
    isGameStart,
    players,
    move,
    playerMove,
    boardRef,
    showRematch,
    acceptRematch,
    playersAcceptedRematch,
  } = useHooks(id, username);

  return (
    <>
      <WaitForOpponentWrapper isGameStart={isGameStart}>
        Czekanie na przeciwnika
      </WaitForOpponentWrapper>
      {showRematch && (
        <RematchWrapper>
          <RematchText>REMATCH?</RematchText>
          {players.map(e => (
            <RematchPlayerName>
              {`${e.playerName.username}: ${
                playersAcceptedRematch.includes(e.playerName.userId) ? 'accepted' : 'wait'
              }`}
            </RematchPlayerName>
          ))}
          <RematchButton onClick={acceptRematch}>rematch</RematchButton>
        </RematchWrapper>
      )}
      <PlayersWrapper>
        {players.map(player => (
          <PlayerInsideWrapper isMove={player.symbol === move} isMe={player.isMe}>
            <PlayerIcon src={player.symbol ? ElipseIcon : xIcon} />
            <PlayerName>{player.playerName.username}</PlayerName>
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
