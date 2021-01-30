import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.dirtyWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 48px;
  margin: 0;
`;

export const UserNameInput = styled.input`
  width: 268px;
  height: 53px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.darkBlue};
  background: ${({ theme }) => theme.colors.lightBlue};
  font-size: 18px;
  padding: 0 26px;
  margin: 113px 0 0 0;

  ::placeholder {
    color: #ededed;
  }
`;

export const Button = styled.button`
  margin: 41px 0 0 0;
  border-radius: 5px;
  width: 168px;
  height: 45px;
  color: #ededed;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.darkBlue};
  border: 0;
  cursor: pointer;
  transition: background 0.2s;

  :hover {
    background: black;
  }
`;
