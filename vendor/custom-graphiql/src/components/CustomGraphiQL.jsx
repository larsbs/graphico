import React from 'react';
import GraphiQL from 'graphiql';

import '../styles/components/custom-graphiql';


function createFetcher(options) {
  return (graphQLParams) => {
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
    return fetch(options.entrypointUrl, fetchConfig)
      .then((response) => response.json());
  };
}


class CustomGraphiQL extends React.Component {

  render() {
    const { entrypointUrl, headers } = this.props;
    console.log(headers);
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
