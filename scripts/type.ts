import type { OutputOptions } from "rollup";

export type packages = "axios" | "chakra" | "graphql";
export type Mode = "production" | "development";
export type MultipleOutput = OutputOptions & {
  multiple?: boolean;
};
