import React from 'react';
import ReactDOM from 'react-dom';

import bootstrap from './bootstrap';


bootstrap(() => {
  ReactDOM.render(
    <h1>Hello World</h1>,
    document.getElementById('root'),
  );
});
