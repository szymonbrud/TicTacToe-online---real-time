import styled, { css } from 'styled-components';

export const TopBarWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 224px;
  position: absolute;
  top: 0;
  left: 0;

  ${({ isWaitingForOpponentView }) =>
    isWaitingForOpponentView &&
    css`
      @media (max-width: 550px) {
        display: none;
      }
    `};

  @media (min-width: 550px) {
    justify-content: space-between;
    padding: 0 90px;
  }
`;

export const Logo = styled.img`
  width: 101px;

  display: none;
  @media (min-width: 550px) {
    display: inline;
  }
`;
