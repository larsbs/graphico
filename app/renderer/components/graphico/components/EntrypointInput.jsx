import React from 'react';

import styles from '../styles/components/entrypoint-input';


const EntrypointInput = (props) => {
  const { onChange, ...rest } = props;
  return (
    <input
      {...rest}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      className="EntrypointInput__input" />
  );
};


export default EntrypointInput;
