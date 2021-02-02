import React from 'react';
import PropTypes from 'prop-types';

import LogoIcon from 'assets/icons/logoIcon.svg';

import { TopBarWrapper, Logo } from './styled';

const TopBar = ({ children }) => (
  <TopBarWrapper>
    <Logo src={LogoIcon} alt="logo" />
    {children}
  </TopBarWrapper>
);

TopBar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TopBar;
