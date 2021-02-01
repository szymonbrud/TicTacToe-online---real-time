import React from 'react';

import copyIcon from 'assets/icons/copyIcon.svg';

import { Button, Icon } from './styled';

import useHooks from './useHooks';

const InvadeButton = () => {
  const { buttonAction, isButtonClicked, buttonRef } = useHooks();

  return (
    <Button onClick={buttonAction} ref={buttonRef}>
      {isButtonClicked ? (
        'zapisano link!'
      ) : (
        <>
          zaproś
          <Icon src={copyIcon} alt="copy" />
        </>
      )}
    </Button>
  );
};

export default InvadeButton;
