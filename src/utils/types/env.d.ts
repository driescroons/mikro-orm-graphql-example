declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		POSTGRES_USER: string;
		POSTGRES_PASSWORD: string;
		POSTGRES_DB: string;
		POSTGRES_HOST: string;
		POSTGRES_PORT: string;
		NODE_DEV: string;
		NODE_ENV: string;
		MIKRO_ORM_ALLOW_GLOBAL_CONTEXT: string;
	}
}
