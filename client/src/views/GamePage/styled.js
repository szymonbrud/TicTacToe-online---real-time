import styled, { css } from 'styled-components';

export const PlayersWrapper = styled.div`
  position: absolute;
  top: 4%;
  left: 8%;
  display: flex;
`;

export const PlayerInsideWrapper = styled.div`
  height: 170px;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ isMove }) =>
    isMove &&
    css`
      background-color: ${({ theme }) => theme.colors.lightBlue};
    `}
`;

export const PlayerIcon = styled.img`
  width: 26px;
  margin-bottom: 20px;
`;

export const PlayerName = styled.p`
  font-size: 24px;
  padding: 0 20px;
  margin: 0;
`;

export const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: 137px 137px 137px;
  grid-template-rows: 137px 137px 137px;
  grid-gap: 22px 22px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Field = styled.div`
  border-radius: 5px;
  border: 4px solid ${({ theme }) => theme.colors.darkBlue};
  background: ${({ theme }) => theme.colors.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const WaitForOpponentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.8);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 10;

  display: ${({ isGameStart }) => (isGameStart ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;

  font-size: 24px;
`;

export const FieldSymbolImage = styled.img`
  width: 30px;
`;
