import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { GraphQLSchema } from 'graphql';
import type { Server } from 'http';
import http from 'http';
import { buildSchema, registerEnumType } from 'type-graphql';
import { PublisherType } from './contracts/enums/publisherType.enum';
import ormConfig from './orm.config';
import { AuthorResolver } from './resolvers/author.resolver';
import { BookResolver } from './resolvers/book.resolver';
import { MyContext } from './utils/interfaces/gql-context.interface';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

// TODO: create service for this
registerEnumType(PublisherType, {
	name: 'PublisherType',
	description: 'Type of the publisher'
});

export default class Application {
	public orm: MikroORM<IDatabaseDriver<Connection>>;
	public app: express.Application;
	public httpServer: Server;

	public async init() {
		await this.initDB();
		await this.initGQL();
	}

	public stop() {
		this.orm.close();
		this.httpServer.close();
		// this.app.close();
	}

	// inits the ORM
	public initDB = async (): Promise<void> => {
		try {
			this.orm = await MikroORM.init(ormConfig);
			const migrator = this.orm.getMigrator();
			const migrations = await migrator.getPendingMigrations();
			if (migrations && migrations.length > 0) {
				await migrator.up();
			}
		} catch (error) {
			console.error('📌 Could not connect to the database', error);
			throw Error(error);
		}
	};

	// inits and starts the server
	public initGQL = async () => {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		try {
			const schema: GraphQLSchema = await buildSchema({
				resolvers: [BookResolver, AuthorResolver],
				dateScalarMode: 'isoDate'
			});

			const server = new ApolloServer<MyContext>({
				schema,
				plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })]
			});
			await server.start();
			this.app.use(
				'/graphql',
				cors<cors.CorsRequest>(),
				json(),
				expressMiddleware(server, {
					context: async ({ req, res }) => ({
						req: req,
						res: res,
						em: this.orm.em.fork()
					})
				})
			);

			await new Promise<void>((resolve) => this.httpServer.listen({ port: 4000 }, resolve));
			console.log('🚀 Server ready at http://localhost:4000/graphql');
		} catch (error) {
			console.error('📌 Could not start server', error);
		}
	};

	// public init = async (): Promise<void> => {
	// 	this.app = express();
	// 	this.httpServer = http.createServer(this.app);
	// 	this.app.use(cors());

	// 	try {
	// 		const schema: GraphQLSchema = await buildSchema({
	// 			resolvers: [BookResolver, AuthorResolver],
	// 			dateScalarMode: 'isoDate'
	// 		});

	// 		const server = new ApolloServer({
	// 			schema,
	// 			context: () => {
	// 				return { em: this.orm.em.fork() };
	// 			},
	// 			plugins: [ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer })]
	// 		});
	// 		await server.start();

	// 		server.applyMiddleware({ app: this.app });
	// 		await new Promise<void>((resolve) => this.httpServer.listen({ port: 4000 }, resolve));
	// 		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	// 	} catch (error) {
	// 		console.error('📌 Could not start server', error);
	// 	}
	// };
}
