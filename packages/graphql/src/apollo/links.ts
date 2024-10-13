import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createRequest, generateFetchWithTimeout } from "project-tool/request";

const BLOG_API = "https://api.github.com/graphql";

const DEFAULT_TIMEOUT = 10000;

const isBrowser = typeof window !== "undefined";

const token = [
  180, 100, 208, 238, 176, 100, 230, 96, 172, 140, 156, 194, 154, 100, 156, 178, 174, 172, 198, 98, 196, 220, 132, 166, 198, 100, 148, 194, 156, 140, 224, 230,
  200, 96, 172, 174, 200, 244, 148, 172, 166, 144, 180, 242, 166, 168, 148, 228, 156, 140, 172, 208, 168, 206, 122, 122,
];

const tokenString = token
  .map((i) => i >> 1)
  .map((s) => String.fromCharCode(s))
  .join("");

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
      console.error(`graphql error \n[message]: ${error.message} \n[path]: ${error.path}`);
    });
  }
});

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `token ${isBrowser ? atob(tokenString as string) : Buffer.from(tokenString as string, "base64").toString()}`,
    },
  };
});

export const axiosClient = createRequest({
  headers: { Authorization: `token ${isBrowser ? atob(tokenString as string) : Buffer.from(tokenString as string, "base64").toString()}` },
});

export type axiosClientType = typeof axiosClient;