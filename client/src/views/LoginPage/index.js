import React from 'react';
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
          <Button onClick={goToGame}>{id ? 'Dołącz' : 'Stwórz pokój'}</Button>
        </>
      ) : (
        <>
          <TopBar />
          <h3>Trwa ładowanie zaplecza aplikacji</h3>
          <p style={{textAlign: "center", padding: "0px 20px", marginTop: '-5px'}}>Ze względu na korzystanie z bezpłatnego serwera zaplecza, proces ten może potrwać od 1 do 2 minut, gdyż konieczne jest uruchomienie odpowiednich procedur</p>
        </>
      )}
    </MainWrapper>
  );
};

export default LoginPage;
