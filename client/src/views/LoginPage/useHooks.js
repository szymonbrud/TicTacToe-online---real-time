import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';

const checkBackend = callback => {
  let API;

  if (window.location.host === 'localhost:3000') {
    API = 'http://localhost:5000';
  } else {
    API = 'https://tictactoeoriginbackend.herokuapp.com';
  }

  fetch(`${API}/isReady`)
    .then(res => res.json())
    .then(data => {
      if (data.status) callback();
    });
};

const useHooks = id => {
  const history = useHistory();
  const inputRef = useRef();

  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    checkBackend(() => {
      setIsBackendReady(true);
    });
  }, []);

  const goToGame = () => {
    if (inputRef.current.value.length >= 1) {
      const path = `/game/${id || uuid()}/${inputRef.current.value}`;
      history.push(path);
    }
  };

  return {
    goToGame,
    inputRef,
    isBackendReady,
  };
};

export default useHooks;
