import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';

const useHooks = id => {
  const history = useHistory();
  const inputRef = useRef();

  const goToGame = () => {
    if (inputRef.current.value.length >= 1) {
      const path = `/game/${id || uuid()}/${inputRef.current.value}`;
      history.push(path);
    }
  };

  return {
    goToGame,
    inputRef,
  };
};

export default useHooks;
