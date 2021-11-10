import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.drityWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 60px;
  margin: 0;
  text-align: center;

  @media (max-width: 350px) {
    font-size: 45px;
  }
`;

export const UserNameInput = styled.input`
  width: 268px;
  height: 53px;
  border-radius: 5px;
  border: 3px solid black;
  background: white;
  font-size: 18px;
  padding: 0 26px;
  margin: 121px 0 0 0;

  ::placeholder {
    color: #a7a7a7;
  }
`;

export const Button = styled.button`
  margin: 41px 0 0 0;
  border-radius: 5px;
  width: 168px;
  height: 45px;
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.orange};
  border: 0;
  cursor: pointer;
  transition: background 0.2s;

  :hover {
    background: black;
  }
`;
