import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.drityWhite};
`;

export const Text = styled.p`
  font-size: 25px;
  margin: 0;
  text-align: center;
`;

export const BackButton = styled(Link)`
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
  text-decoration: none;
  color: black;

  cursor: pointer;
`;
