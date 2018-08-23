import React from 'react';

import Header from './Header';
import CustomGraphiQL from './CustomGraphiQL';
import HeadersModal from './HeadersModal';

import styles from '../styles/components/graphico';
import '../styles/customizations/all';


class Graphico extends React.Component {

  state = {
    entrypointUrl: '',
    showHeadersModal: false,
    headers: '',
  };

  render() {
    const { entrypointUrl, showHeadersModal, headers } = this.state;
    const finalEntrypoint = do {
      if ( ! entrypointUrl && window.localStorage.entrypointUrl) {
        window.localStorage.entrypointUrl;
      }
      else {
        entrypointUrl;
      }
    }
    const finalHeaders = do {
      if ( ! headers && window.localStorage.headers) {
        window.localStorage.headers;
      }
      else {
        headers;
      }
    }
    window.localStorage.entrypointUrl = finalEntrypoint;
    window.localStorage.headers = finalHeaders;
    return (
      <div className="Graphico__mainLayout">
        <div className="Graphico__header">
          <Header
            entrypointUrl={finalEntrypoint}
            onChangeEntrypointUrl={(entrypointUrl) => this.setState({ entrypointUrl }) }
            onClickToggleHeaders={() => this.setState({ showHeadersModal: ! showHeadersModal }) }/>
        </div>
        <div className="Graphico__main">
          <CustomGraphiQL entrypointUrl={finalEntrypoint} headers={finalHeaders} />
        </div>
        <HeadersModal
          isShown={showHeadersModal}
          headers={finalHeaders}
          onClickClose={() => this.setState({ showHeadersModal: false })}
          onClickAccept={(headers) => this.setState({ headers, showHeadersModal: false })} />
      </div>
    );
  }

}


export default Graphico;
