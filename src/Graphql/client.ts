import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

const cache = new InMemoryCache({});

await persistCache({
  cache,
  storage: new LocalStorageWrapper(localStorage),
});


const client = new ApolloClient({
  uri: 'https://wpe-hiring.tokopedia.net/graphql',
  cache,
});


export default client;