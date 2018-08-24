import React from 'react';
import GraphiQL from 'graphiql';

import '../styles/components/custom-graphiql';


function createFetcher(options) {
  return async (graphQLParams) => {
    if (options.entrypointUrl && ! options.entrypointUrl.match(/^https?\:\/\/.+/)) {
      return Promise.reject('Invalid entrypoint');
    }
    const fetchConfig = {
      method: 'post',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
    };
    try {
      const response = await fetch(options.entrypointUrl, fetchConfig)
      const json = await response.json();
      return json;
    }
    catch (err) {
      return '';
    }
  };
}


class CustomGraphiQL extends React.Component {

  render() {
    const { entrypointUrl, headers } = this.props;
    return (
      <GraphiQL
        editorTheme="material"
        fetcher={createFetcher({
          entrypointUrl,
          headers: headers ? JSON.parse(headers) : {},
        })} />
    );
  }

}


export default CustomGraphiQL;
