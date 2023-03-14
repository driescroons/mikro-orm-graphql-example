import { MikroORM } from '@mikro-orm/core';
import { AllSubscriber } from 'subscribers/all.subscriber';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export default {
	subscribers: [new AllSubscriber()],
	migrations: {
		path: './src/migrations',
		tableName: 'migrations',
		transactional: false,
		disableForeignKeys: true,
		dropTables: true, // allow to disable table dropping
		safe: false // allow to disable table and column dropping
	},
	tsNode: process.env.NODE_DEV === 'true' ? true : false,
	allowGlobalContext: process.env.NODE_DEV === 'true' ? true : false,
	user: process.env.POSTGRES_USER || 'root',
	password: process.env.POSTGRES_PASSWORD || 'root',
	dbName: process.env.POSTGRES_DB || 'mikro-orm-graphql-data',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: process.env.POSTGRES_PORT || 5432,
	entities: ['dist/**/*.entity.js'],
	entitiesTs: ['src/**/*.entity.ts'],
	type: 'postgresql',
	logger: console.log.bind(console),
	debug: true,
	highlighter: new SqlHighlighter()
} as Parameters<typeof MikroORM.init>[0];
