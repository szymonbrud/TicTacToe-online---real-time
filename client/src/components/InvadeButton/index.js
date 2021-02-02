import React from 'react';
import { useParams } from 'react-router-dom';

import copyIcon from 'assets/icons/copyIcon.svg';

import { Button, Icon } from './styled';

import useHooks from './useHooks';

const InvadeButton = () => {
  const { id } = useParams();
  const { buttonAction, isButtonClicked, buttonRef } = useHooks(id);

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
