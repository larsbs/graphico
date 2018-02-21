import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import styles from '../styles/components/modal';


const Overlay = ({
  children,
  onClick,
}) => {
  return (
    <div className="Modal__overlay" onClick={onClick} data-element="overlay">
      {children}
    </div>
  );
};


const ModalComponent = ({
  children
}) => {
  return (
    <div className="Modal__modal" data-element="modal">
      {children}
    </div>
  );
};


class Modal extends React.Component {

  render() {
    const { isShown, children, ...rest } = this.props;
    return ReactDOM.createPortal(
      <CSSTransition
        in={isShown}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames="modalTransition">
        <Overlay>
          <ModalComponent {...rest}>
            {children}
          </ModalComponent>
        </Overlay>
      </CSSTransition>,
      document.getElementById('modals-outlet'),
    );
  }

}


export default Modal;
