declare global {
  const __CLIENT__: boolean;
  const __SERVER__: boolean;
  const __DEV__: boolean;

  const importScripts: (s: string) => void;

  const Babel: any;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
