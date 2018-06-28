import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Router>
      <Route path="/" component={AppWithRouter} />
  </Router>
  ,document.getElementById("root")
);
