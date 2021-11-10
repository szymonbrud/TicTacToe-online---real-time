import React from 'react';
import PropTypes from 'prop-types';

import LogoIcon from 'assets/icons/logoIcon.svg';

import { TopBarWrapper, Logo } from './styled';

const TopBar = ({ children, isWaitingForOpponentView }) => (
  <TopBarWrapper isWaitingForOpponentView={isWaitingForOpponentView}>
    <Logo src={LogoIcon} alt="logo" />
    {children}
  </TopBarWrapper>
);

TopBar.propTypes = {
  children: PropTypes.element.isRequired,
  isWaitingForOpponentView: PropTypes.bool,
};

TopBar.defaultProps = {
  isWaitingForOpponentView: false,
};

export default TopBar;
