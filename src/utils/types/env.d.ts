declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    TOKEN_ACCESS_LIFETIME: string;
    JWT_SECRET: string;
    NODE_DEV: string;
  }
}
