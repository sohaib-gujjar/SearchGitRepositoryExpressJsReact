import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import DefaultPage from './pages/DefaultPage';
import { Page404 } from './pages/404Page';
import BookMarkedRepos from './pages/BookMarkedRepos';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DefaultPage} />
          <Route exact path="/bookmarked" component={BookMarkedRepos} />
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
