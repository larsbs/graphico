import React from 'react';
import Behave from 'behave';

import Modal from './Modal';
import Button from './Button';

import styles from '../styles/components/headers-modal';


class HeadersModal extends React.Component {

  state = {
    value: '{}',
  };

  componentWillReceiveProps(props) {
    const { headers } = props;
    if (headers) {
      this.setState({ value: headers });
    }
  }

  componentDidUpdate() {
    const { isShown } = this.props;
    if (isShown) {
      this.editor = this.editor ? this.editor : new Behave({
        textarea: this.textarea,
        tabSize: 2,
      });
    }
    else {
      this.editor ? this.editor.destroy() : null;
      this.editor = null;
    }
  }

  render() {
    const {
      isShown,
      onClickClose,
      onClickAccept,
    } = this.props;
    const { value } = this.state;
    let error = false;
    try {
      JSON.parse(value);
    }
    catch (err) {
      error = true;
    }
    return (
      <Modal isShown={isShown}>
        <div className="HeadersModal">
          <div className="HeadersModal__header">
            <div className="HeadersModal__title">
              HTTP Headers
            </div>
            <div className="HeadersModal__close" onClick={onClickClose}>
              <svg style={{ width: '12px', height: '12px' }}>
                <line x1="1" y1="11"
                      x2="11" y2="1"
                      strokeWidth="2"/>
                <line x1="1" y1="1"
                      x2="11" y2="11"
                      strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="HeadersModal__body">
            <textarea
              ref={(ref) => this.textarea = ref}
              value={value || '{}'}
              onChange={(e) => this.setState({ value: e.target.value })}
              className="HeadersModal__textarea">
            </textarea>
            {do {
              if (error) {
                <span className="HeadersModal__error">Invalid JSON</span>
              }
            }}
          </div>
          <div className="HeadersModal__footer">
            <Button onClick={onClickClose}>
              Cancel
            </Button>
            <Button disabled={error} onClick={() => onClickAccept(value)}>
              Accept
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

}


export default HeadersModal;
