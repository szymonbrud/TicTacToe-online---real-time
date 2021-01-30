import React from 'react';
import { useParams } from 'react-router-dom';

import { MainWrapper, Title, UserNameInput, Button } from './styled';

import useHooks from './useHooks';

const LoginPage = () => {
  const { id } = useParams();

  const { goToGame, inputRef } = useHooks(id);

  return (
    <MainWrapper>
      <Title>TIC TAC TOE</Title>
      <UserNameInput placeholder="nickname" ref={inputRef} />
      <Button onClick={goToGame}>{id ? 'Join' : 'Create room'}</Button>
    </MainWrapper>
  );
};

export default LoginPage;
