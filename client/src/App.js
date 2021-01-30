import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyleProvider } from 'assets/styles/GlobalStyles';

import LoginPage from 'views/LoginPage';
import GamePage from 'views/GamePage';

const App = () => (
  <GlobalStyleProvider>
    <Router>
      <Switch>
        <Route path="/game/:id/:username" exact component={GamePage} />
        <Route path="/:id?" component={LoginPage} />
      </Switch>
    </Router>
  </GlobalStyleProvider>
);

export default App;
