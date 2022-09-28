import type { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import type { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";

export type ServerSidePropsExtensionRequest<T = Record<string, unknown>> = (context: GetServerSidePropsContext) => Promise<T> | T;

export type StaticPropsExtensionRequest<T = Record<string, unknown>> = (context: GetStaticPropsContext) => Promise<T> | T;

export type GenerateExtensionRequest<T = Record<string, unknown>, K = Record<string, unknown>> = (...t: T[]) => ServerSidePropsExtensionRequest<K>;

export type GenerateStaticRequest<T = Record<string, unknown>, K = Record<string, unknown>> = (...t: T[]) => StaticPropsExtensionRequest<K>;

export type GetServerSidePropsWithGql<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetServerSidePropsContext<Q, D> & {
    apolloClient: ApolloClient<NormalizedCacheObject>;
  },
) => Promise<GetServerSidePropsResult<P>>;

export type GetStaticPropsWithGql<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (
  context: GetStaticPropsContext<Q, D> & {
    apolloClient: ApolloClient<NormalizedCacheObject>;
  },
) => Promise<GetStaticPropsResult<P>> | GetStaticPropsResult<P>;
