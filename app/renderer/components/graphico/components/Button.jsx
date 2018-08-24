import React from 'react';
import cn from 'classnames';

import styles from '../styles/components/button';


const Button = ({
  children,
  className,
  onClick,
  disabled,
}) => {
  return (
    <button disabled={disabled} className={cn('Button', className)} onClick={onClick}>
      {children}
    </button>
  );
}


export default Button;
