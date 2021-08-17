import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TopBar from 'components/TopBar';

import { MainWrapper, Title, UserNameInput, Button } from './styled';

import useHooks from './useHooks';

const LoginPage = () => {
  const { id } = useParams();

  const { goToGame, inputRef, isBackendReady } = useHooks(id);

  return (
    <MainWrapper>
      {isBackendReady ? (
        <>
          <TopBar />
          <Title>TIC TAC TOE</Title>
          <UserNameInput placeholder="nickname" ref={inputRef} />
          <Button onClick={goToGame}>{id ? 'Join' : 'Create room'}</Button>
        </>
      ) : (
        <>
          <TopBar />
          <h3>Trwa ładowanie zaplecza aplikacji</h3>
        </>
      )}
    </MainWrapper>
  );
};

export default LoginPage;
