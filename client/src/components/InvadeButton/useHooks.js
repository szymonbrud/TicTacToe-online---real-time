import { useState, useRef } from 'react';
import gsap from 'gsap';

const useHooks = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const buttonRef = useRef();

  const buttonAnimatino = () => {
    gsap.to(buttonRef.current, 0.15, {
      scale: 1.1,
      background: '#000',
      color: '#fff',
    });

    gsap.to(buttonRef.current, 0.15, {
      delay: 0.15,
      scale: 1,
    });
  };

  const buttonAction = () => {
    setIsButtonClicked(true);
    buttonAnimatino();
  };

  return {
    isButtonClicked,
    buttonAction,
    buttonRef,
  };
};

export default useHooks;
