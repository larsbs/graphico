import React from 'react';
import { StyleSheet, css } from 'aphrodite-jss';

import styleVars from '~/utils/style-vars';


const styles = StyleSheet.create({
  input: {
    width: '100%',
    background: '#151C20',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    padding: `calc(${styleVars.basePadding} * 0.5) ${styleVars.basePadding}`,
    borderRadius: styleVars.baseBorderRadius,
    color: styleVars.primaryTextColor,
    fontSize: '0.9em',
    outline: 'none !important',
    fontFamily: styleVars.defaultFontFamily,
    '&::placeholder': {
      color: styleVars.tertiaryTextColor,
    },
  }
});


const EntrypointInput = (props) => {
  const { onChange, ...rest } = props;
  return (
    <input
      {...rest}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      className={css(styles.input)} />
  );
};


export default EntrypointInput;
