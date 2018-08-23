import React from 'react';

import EntrypointInput from './EntrypointInput';
import Button from './Button';

import styles from '../styles/components/toolbar';


const Toolbar = ({
  entrypointUrl,
  onChangeEntrypointUrl,
  onClickToggleHeaders,
}) => {
  return (
    <div className="Toolbar">
      <div className="Toolbar__input">
        <EntrypointInput
          placeholder="GraphqQL entry-point"
          value={entrypointUrl}
          onChange={onChangeEntrypointUrl} />
      </div>
      <div className="Toolbar__headersToggle">
        <Button
          className="Toolbar__headersToggleButton"
          onClick={onClickToggleHeaders}>
          HTTP Headers
        </Button>
      </div>
    </div>
  );
}


export default Toolbar;
