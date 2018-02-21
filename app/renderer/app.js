import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import bootstrap from './bootstrap';
import Root from './routes/Root';

import './styles/app';


bootstrap(() => {
  const renderApp = (Root) => {
    ReactDOM.render(
      <AppContainer warnings={false}>
        <Root />
      </AppContainer>,
      document.getElementById('root'),
    );
  }

  if (module.hot) {
    module.hot.accept('./routes/Root', () => renderApp(Root));
  }

  renderApp(Root);
});
