import React from 'react';
import cn from 'classnames';
import { StyleSheet, css } from 'aphrodite-jss';

import styleVars from '~/utils/style-vars';


const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
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
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: 8,
    fontSize: '1.2em',
    cursor: 'pointer',
    opacity: 0.5,
    transition: 'all 0.3s ease-in-out',
    userSelect: 'none',
    '&:hover': {
      opacity: 1,
    },
  },
});


const EntrypointInput = (props) => {
  const { onChange, value, name, ...rest } = props;
  return (
    <div className={css(styles.container)}>
      <input
        {...rest}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value, e.target.name)}
        className={css(styles.input)} />
      <i
        id="refresh-icon"
        className={cn('material-icons', css(styles.icon))}
        onClick={(e) => {
          const { transform } = e.target.style;
          let rotation;
          if ( ! transform) {
            rotation = 0;
          }
          else {
            const [ , rotationValue ] = transform.match(/rotate\((\d+)deg\)/);
            rotation = parseInt(rotationValue);
          }
          e.target.style.transform = `rotate(${rotation + 360}deg)`;
          onChange(value, name);
        }}>
        refresh
      </i>
    </div>
  );
};


export default EntrypointInput;
