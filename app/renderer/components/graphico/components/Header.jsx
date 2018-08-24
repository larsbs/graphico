import React from 'react';

import Tabs from './Tabs';
import Toolbar from './Toolbar';

import styles from '../styles/components/header';


const Header = ({
  entrypointUrl,
  onChangeEntrypointUrl,
  onClickToggleHeaders,
}) => {
  return (
    <div className="Header__header">
      <div className="Header__tabs">
        <Tabs />
      </div>
      <div className="Header__toolbar">
        <Toolbar
          entrypointUrl={entrypointUrl}
          onChangeEntrypointUrl={onChangeEntrypointUrl}
          onClickToggleHeaders={onClickToggleHeaders} />
      </div>
    </div>
  );
};


export default Header;
