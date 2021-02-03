import React from 'react';

import TopBar from 'components/TopBar';

import { BackButton, Text, Wrapper } from './styled';

const ErrorPage = () => (
  <>
    <TopBar />
    <Wrapper>
      <Text>Pokój do którego chcesz dołączyć jest pełny.</Text>
      <BackButton to="/">powrót</BackButton>
    </Wrapper>
  </>
);

export default ErrorPage;
