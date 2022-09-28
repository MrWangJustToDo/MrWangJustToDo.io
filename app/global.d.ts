declare global {
  const __CLIENT__: boolean;
  const __SERVER__: boolean;
  const __DEV__: boolean;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
