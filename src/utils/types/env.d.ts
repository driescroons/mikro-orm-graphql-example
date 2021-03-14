declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_DEV: string;
    NODE_ENV: string;
    DATABASE_URL: string;
  }
}
