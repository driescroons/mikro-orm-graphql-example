import { DocumentNode, print } from 'graphql';
import request from 'supertest';
import Application from '../src/application';
import { PublisherType } from '../src/contracts/enums/publisherType.enum';
import { Author } from '../src/entities/author.entity';
import { Book } from '../src/entities/book.entity';
import { Publisher } from '../src/entities/publisher.entity';
import { Tag } from '../src/entities/tag.entity';
import createSimpleUuid from '../src/utils/helpers/createSimpleUuid.helper';

import { faker } from '@faker-js/faker';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

export const clearDatabase = async (orm: MikroORM<IDatabaseDriver<Connection>>): Promise<void> => {
	await orm.getSchemaGenerator().dropSchema({ wrap: true, dropMigrationsTable: true });
	const migrator = orm.getMigrator();
	const migrations = await migrator.getPendingMigrations();
	if (migrations && migrations.length > 0) {
		await migrator.up();
	}

	// additional sync for development
	// this way we can just create 1 migration after development
	await orm.getSchemaGenerator().updateSchema();
};

export const loadFixtures = async (orm: MikroORM<IDatabaseDriver<Connection>>): Promise<void> => {
	try {
		const tags = await Promise.all(
			[...Array(5)].map(async (_, tagIndex) => {
				const tag = new Tag({
					name: `tag ${tagIndex + 1}`
				});

				// setting temporary id for test purposes
				tag.id = createSimpleUuid(tagIndex + 1);

				orm.em.persist(tag);
				return tag;
			})
		);

		const publishers = await Promise.all(
			[...Array(5)].map(async (_, publisherIndex) => {
				const publisher = new Publisher({
					name: faker.company.name(),
					type: PublisherType.GLOBAL
				});

				// setting temporary id for test purposes
				publisher.id = createSimpleUuid(publisherIndex + 1);

				orm.em.persist(publisher);
				return publisher;
			})
		);

		const authors = await Promise.all(
			[...Array(5)].map(async (_, authorIndex) => {
				const author = new Author({
					name: `author ${authorIndex + 1}`,
					email: faker.internet.email(),
					born: new Date(new Date().setFullYear(1994))
				});

				// setting temporary id for test purposes
				author.id = createSimpleUuid(authorIndex + 1);

				orm.em.persist(author);
				return author;
			})
		);

		await Promise.all(
			[...Array(5)].map(async (_, bookIndex) => {
				const book = new Book({
					title: `title ${bookIndex + 1}`
				});

				// setting temporary id for test purposes
				book.id = createSimpleUuid(bookIndex + 1);
				book.tags.add(orm.em.getRepository(Tag).getReference(tags[bookIndex].id));
				book.author = orm.em.getRepository(Author).getReference(authors[bookIndex].id);
				book.publisher = orm.em.getRepository(Publisher).getReference(publishers[bookIndex].id);

				orm.em.persist(book);
				return book;
			})
		);

		await orm.em.flush();
	} catch (error) {
		console.error('📌 Could not load fixtures', error);
	}
};

let cachedServer: any;

const createServer = async () => {
	const app = new Application();
	await app.init();
	return app.httpServer;
};

export function resetDB() {
	//
}

export const sendLocalQuery = async (
	query: DocumentNode,
	{
		variables = {},
		headers = {}
	}: {
		variables?: any;
		headers?: { [key: string]: string };
	} = {}
): Promise<any> => {
	const server = cachedServer ?? (await createServer());
	cachedServer = server;
	const requestBuilder = request(server).post('/graphql').expect(200);

	Object.entries(headers).forEach(([key, value]) => {
		requestBuilder.set(key, value);
	});
	const { text } = await requestBuilder.send({
		variables,
		query: print(query)
	});
	return JSON.parse(text);
};
