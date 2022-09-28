import { getApolloClient } from "@blog/graphql";
import { once } from "lodash-es";

import { withColorCookie, withColorCookieStatic, withI18n, withI18nStatic } from "./commonRequest";

import type { ExcludeNameSpaceConfig, IncludeNameSpaceConfig, NameSpaceConfig } from "../serverSideTranslations";
import type { GetServerSidePropsWithGql, GetStaticPropsWithGql, ServerSidePropsExtensionRequest, StaticPropsExtensionRequest } from "./type";
import type { GetServerSideProps, GetStaticProps } from "next";

// NOTE: if you use this function to wrapper getServerSideProps, you need make sure handle all error by you hand
function withExtension(originalGetServerSideProps: GetServerSideProps, ...extensionRequests: ServerSidePropsExtensionRequest[]): GetServerSideProps;

function withExtension(originalGetStaticProps: GetStaticProps, ...extensionRequests: StaticPropsExtensionRequest[]): GetStaticProps;

function withExtension(
  originalRequest: GetServerSideProps | GetStaticProps,
  ...extensionRequests: ServerSidePropsExtensionRequest[] | StaticPropsExtensionRequest[]
): GetServerSideProps | GetStaticProps {
  return async (context) => {
    const originalResult = await originalRequest(context);

    // if current serverSide data do not have a props
    // e.g.  {redirect} / {notFound}
    if (!originalResult["props"]) {
      return originalResult;
    }

    const lastData = await Promise.all(extensionRequests.map((request) => request(context))).catch((e) => {
      if (__DEV__) {
        console.error(`[server] server side error: ${(e as Error).message}`);
      }
      throw e;
    });

    return {
      ...originalResult,
      props: {
        ...originalResult["props"],
        ...lastData.reduce((a, b) => ({ ...a, ...b })),
      },
    };
  };
}

const defaultRequest = async () => ({ props: {} });

const onceLog = once(() =>
  console.log(
    `[server] for server side apollo query, also should return a valid nextjs server side result. like: {props: data} / {notFound: boolean} / {redirect: redirect}`,
  ),
);

function composeQuery({ restful, gql }: { restful?: GetServerSideProps; gql?: GetServerSidePropsWithGql }): GetServerSideProps;
function composeQuery({ restful, gql }: { restful?: GetStaticProps; gql?: GetStaticPropsWithGql }): GetStaticProps;
function composeQuery({ restful, gql }: { restful?: GetServerSideProps | GetStaticProps; gql?: GetServerSidePropsWithGql | GetStaticPropsWithGql }) {
  if (!restful && !gql) {
    return defaultRequest;
  }
  if (!gql) {
    return restful;
  }
  restful = restful || defaultRequest;
  gql = gql || defaultRequest;
  return async (context) => {
    const apolloClient = getApolloClient();
    const [restfulData, gqlData] = await Promise.all([restful(context), gql({ ...context, apolloClient })]).catch((e) => {
      if (__DEV__) {
        console.error(`[server] server side error: ${(e as Error).message}`);
      }
      throw e;
    });

    if (__DEV__) {
      onceLog();
    }

    if (restfulData["props"] && gqlData["props"]) {
      return {
        ...restfulData,
        ...gqlData,
        props: {
          // used for client side apollo cache merge
          ["_apolloState"]: gqlData["props"],
          ...restfulData["props"],
        },
      };
    }
    if (restfulData["redirect"] && gql["props"]) {
      if (__DEV__ && __SERVER__) {
        console.warn(`[server] restful request do the redirect, gql data will be ignore`);
      }
      return restfulData;
    }
    if (gqlData["redirect"] && restfulData["props"]) {
      if (__DEV__ && __SERVER__) {
        console.warn(`[server] gql request do the redirect, restful data will be ignore`);
      }
      return gqlData;
    }
    return {
      notFound: true,
    };
  };
}

export function generateGetServerSideProps({
  extendI18nNameSpaces,
  restfulQuery,
  gqlQuery,
  extensionRequests,
}?: {
  extendI18nNameSpaces?: ExcludeNameSpaceConfig[];
  restfulQuery?: GetServerSideProps;
  gqlQuery?: GetServerSidePropsWithGql;
  extensionRequests?: ServerSidePropsExtensionRequest[];
}): GetServerSideProps;
export function generateGetServerSideProps({
  extendI18nNameSpaces,
  restfulQuery,
  gqlQuery,
  extensionRequests,
}?: {
  extendI18nNameSpaces?: IncludeNameSpaceConfig[];
  restfulQuery?: GetServerSideProps;
  gqlQuery?: GetServerSidePropsWithGql;
  extensionRequests?: ServerSidePropsExtensionRequest[];
}): GetServerSideProps;
export function generateGetServerSideProps({
  extendI18nNameSpaces = [],
  restfulQuery,
  gqlQuery,
  extensionRequests = [],
}: {
  extendI18nNameSpaces?: NameSpaceConfig[];
  restfulQuery?: GetServerSideProps;
  gqlQuery?: GetServerSidePropsWithGql;
  extensionRequests?: ServerSidePropsExtensionRequest[];
} = {}) {
  return withExtension(composeQuery({ restful: restfulQuery, gql: gqlQuery }), withI18n(...extendI18nNameSpaces), withColorCookie(), ...extensionRequests);
}

export function generateGetStaticProps({
  extendI18nNameSpaces,
  restfulQuery,
  gqlQuery,
  extensionRequests,
}?: {
  extendI18nNameSpaces?: ExcludeNameSpaceConfig[];
  restfulQuery?: GetStaticProps;
  gqlQuery?: GetStaticPropsWithGql;
  extensionRequests?: StaticPropsExtensionRequest[];
}): GetStaticProps;
export function generateGetStaticProps({
  extendI18nNameSpaces,
  restfulQuery,
  gqlQuery,
  extensionRequests,
}?: {
  extendI18nNameSpaces?: IncludeNameSpaceConfig[];
  restfulQuery?: GetStaticProps;
  gqlQuery?: GetStaticPropsWithGql;
  extensionRequests?: StaticPropsExtensionRequest[];
}): GetStaticProps;
export function generateGetStaticProps({
  extendI18nNameSpaces = [],
  restfulQuery,
  gqlQuery,
  extensionRequests = [],
}: {
  extendI18nNameSpaces?: NameSpaceConfig[];
  restfulQuery?: GetStaticProps;
  gqlQuery?: GetStaticPropsWithGql;
  extensionRequests?: StaticPropsExtensionRequest[];
} = {}) {
  return withExtension(
    composeQuery({ restful: restfulQuery, gql: gqlQuery }),
    withI18nStatic(...extendI18nNameSpaces),
    withColorCookieStatic(),
    ...extensionRequests,
  );
}
