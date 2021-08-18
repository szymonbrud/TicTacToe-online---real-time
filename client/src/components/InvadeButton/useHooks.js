import { useState, useRef } from 'react';
import gsap from 'gsap';

const useHooks = roomId => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const buttonRef = useRef();

  const buttonAnimation = () => {
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
    buttonAnimation();

    const link = `${window.location.origin}/${roomId}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {})
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  };

  return {
    isButtonClicked,
    buttonAction,
    buttonRef,
  };
};

export default useHooks;
