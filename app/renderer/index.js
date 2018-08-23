import React from 'react';
import ReactDOM from 'react-dom';

import bootstrap from './bootstrap';
import App from './app';


bootstrap(() => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
});
