import React from 'react';
import { hot } from 'react-hot-loader';

import Root from './routes/Root';

import './styles/app';


class App extends React.Component {
  render() {
    return (
      <Root />
    );
  }
}


export default hot(module)(App);
