import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { log } from "utils/log";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const onErrorLink = onError(({ networkError, graphQLErrors, forward }) => {
  if (networkError) {
    log(
      `network error \n[message]: ${networkError.message}  \n[stack]: ${networkError.stack}`,
      "error"
    );
  }
  if (graphQLErrors?.length) {
    graphQLErrors.forEach((error) => {
      log(
        `graphql error \n[message]: ${error.message} \n[stack]: ${error.stack}`,
        "error"
      );
    });
  }
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `token ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([onErrorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo() {
  const store = useMemo(() => initializeApollo(), []);
  return store;
}
