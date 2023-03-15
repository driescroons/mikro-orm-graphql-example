declare namespace NodeJS {
	export interface ProcessEnv {
		// http graphql port
		PORT: string;
		// postgres location
		POSTGRES_USER: string;
		POSTGRES_PASSWORD: string;
		POSTGRES_DB: string;
		POSTGRES_HOST: string;
		POSTGRES_PORT: string;
		// node environment
		NODE_DEV: string;
		NODE_ENV: string;
	}
}
