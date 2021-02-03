import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyleProvider } from 'assets/styles/GlobalStyles';

import LoginPage from 'views/LoginPage';
import GamePage from 'views/GamePage';
import ErrorPage from 'views/ErrorPage';

const App = () => (
  <GlobalStyleProvider>
    <Router>
      <Switch>
        <Route path="/game/:id/:username" exact component={GamePage} />
        <Route path="/error" exact component={ErrorPage} />
        <Route path="/:id?" component={LoginPage} />
      </Switch>
    </Router>
  </GlobalStyleProvider>
);

export default App;
