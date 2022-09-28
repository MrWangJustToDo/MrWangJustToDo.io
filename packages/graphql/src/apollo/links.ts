import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { generateFetchWithTimeout } from "@blog/axios";

const BLOG_API = "https://api.github.com/graphql";

const DEFAULT_TIMEOUT = 10000;

const isBrowser = typeof window !== "undefined";

export const httpLink = new HttpLink({
  uri: BLOG_API,
  fetch:
    // if there are not a fetch function, fallback to apollo client default function
    typeof fetch === "undefined" ? undefined : generateFetchWithTimeout(DEFAULT_TIMEOUT),
});

export const onErrorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.error(`network error \n[message]: ${networkError.message}  \n[stack]: ${networkError.stack}`);
  }
  if (graphQLErrors?.length) {
    graphQLErrors.forEach((error) => {
      console.error(`graphql error \n[message]: ${error.message} \n[stack]: ${error.stack}`);
    });
  }
});

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `token ${
        isBrowser ? atob(process.env.NEXT_PUBLIC_TOKEN as string) : Buffer.from(process.env.NEXT_PUBLIC_TOKEN as string, "base64").toString()
      }`,
    },
  };
});
