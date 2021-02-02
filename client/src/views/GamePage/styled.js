import styled, { css } from 'styled-components';
import media from 'assets/styles/media';

export const MainWrapper = styled.div`
  background: ${({ theme }) => theme.colors.drityWhite};
  min-height: 100vh;
`;

export const PlayersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 82px;
  background: white;
`;

export const PlayerInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
  font-size: 18px;
  padding: 0 27px;
  margin: 0;

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 7px;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.orange};
    display: ${({ isMove }) => (isMove ? 'block' : 'none')};
  }
`;

export const PlayerIcon = styled.img`
  width: 20px;
  margin-left: 12px;
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

  ::before {
    ${({ isWin }) =>
      isWin === 1
        ? css`
            content: 'WYGRAŁEŚ';
          `
        : isWin === 2
        ? css`
            content: 'PRZEGRAŁEŚ';
          `
        : css`
            content: 'REMIS';
          `}

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.7);
    font-size: 50px;
  }
`;

export const Field = styled.div`
  border-radius: 5px;
  border: 4px solid black;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    border: 4px solid ${({ theme }) => theme.colors.orange};
  }
`;

export const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.desktop`
    display: none;
  `}
`;

export const InvadeButtonWrapper = styled.div`
  display: none;
  ${media.desktop`
    display: block;
  `}
`;

export const WaitForOpponentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.drityWhite};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Text = styled.p`
  font-size: 30px;
  margin: 0 0 100px 0;
`;

export const RevengeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.drityWhite};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const RevengeText = styled.h1`
  font-size: 60px;
  font-weight: 700;
  margin: 0 0 43px 0;
`;

export const PlayerAcceptStatus = styled.div`
  width: 307px;
  height: 97px;
  margin-top: 13px;
  background: ${({ theme }) => theme.colors.crema};
  display: flex;
  flex-direction: column;
  padding: 25px 22px;
`;

export const PlayerName = styled.p`
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 5px 0;
`;

export const PlayerStatus = styled.p`
  font-size: 18px;
  margin: 0;

  ${({ isAccepted }) =>
    isAccepted &&
    css`
      color: ${({ theme }) => theme.colors.orange};
      font-weight: 700;
    `}
`;

export const RevengeButton = styled.button`
  background: white;
  border: 3px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 18px;
  width: 158px;
  height: 55px;
  margin: 100px 0 0 0;

  cursor: pointer;
`;

//-----------------------------------------------------

export const FieldSymbolImage = styled.img`
  width: 50px;
`;

export const RematchWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  z-index: 10;
`;

export const RematchButton = styled.button`
  background: white;
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  font-size: 18px;
  margin: 40px 0 0 0;

  transition: background 0.2s, color 0.2s;

  :hover {
    background: black;
    color: white;
  }
`;

export const RematchPlayerName = styled.p`
  font-size: 18px;
  margin: 15px 0;
`;

export const RematchText = styled.h1`
  margin: 0 0 40px 0;
`;
