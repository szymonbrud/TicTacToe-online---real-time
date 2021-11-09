import styled, { css } from 'styled-components';
import media from 'assets/styles/media';

export const MainWrapper = styled.div`
  background: ${({ theme }) => theme.colors.drityWhite};
  min-height: 100vh;
  max-width: 100vw;
  padding: 200px 0 150px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const PlayersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 82px;
  background: white;
  max-width: 300px;
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
  grid-template-columns: 25vw 25vw 25vw;
  grid-template-rows: 25vw 25vw 25vw;
  grid-gap: 2vw;
  justify-content: center;

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

  @media (min-width: 500px) {
    grid-template-columns: 130px 130px 130px;
    grid-template-rows: 130px 130px 130px;
    grid-gap: 20px;
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
  position: fixed;
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

export const FieldSymbolImage = styled.img`
  width: 50px;

  @media (max-height: 800px) {
    width: 46%;
  }
`;
