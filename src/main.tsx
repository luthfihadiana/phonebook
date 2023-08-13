import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './main.styles.tsx'
import {ApolloProvider} from '@apollo/client';
import client from './Graphql/client.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
