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
import { isBrowser } from "utils/env";
import { BLOG_API } from "config/source";
import { ENABLE_INFINITY_SCROLL } from "config/gridLayout";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({ uri: BLOG_API });

const onErrorLink = onError(({ networkError, graphQLErrors }) => {
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
      Authorization: `token ${
        isBrowser
          ? atob(process.env.NEXT_PUBLIC_TOKEN)
          : process.env.NEXT_PUBLIC_TOKEN
      }`,
    },
  };
});

const autoMergeCache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        issues: {
          keyArgs: false,
          merge(existing = { nodes: [] }, incoming) {
            return {
              ...existing,
              ...incoming,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
      },
    },
    Issue: {
      fields: {
        comments: {
          keyArgs: false,
          merge(existing = { nodes: [] }, incoming) {
            const addedNodes = incoming.nodes.filter((node) =>
              existing.nodes.every((_node) => _node.__ref !== node.__ref)
            );
            return {
              ...existing,
              ...incoming,
              nodes: [...existing.nodes, ...addedNodes],
            };
          },
        },
      },
    },
  },
});

const plainCache = new InMemoryCache();

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([onErrorLink, authLink, httpLink]),
    cache: ENABLE_INFINITY_SCROLL ? autoMergeCache : plainCache,
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
