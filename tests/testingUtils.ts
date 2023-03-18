import { DocumentNode, print } from 'graphql';
import request from 'supertest';

import type { Server } from 'http';
import { PublisherType } from '../src/contracts/enums/publisherType.enum';
import { Author } from '../src/entities/author.entity';
import { Book } from '../src/entities/book.entity';
import { Publisher } from '../src/entities/publisher.entity';
import { Tag } from '../src/entities/tag.entity';
import createDummyUuid from './createDummyUuid.helper';

import { faker } from '@faker-js/faker';
import { Connection, IDatabaseDriver, MikroORM, wrap } from '@mikro-orm/core';
import { assert } from 'console';

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
	const em = orm.em;

	try {
		const tags = await Promise.all(
			[...Array(5)].map(async (_, tagIndex) => {
				const tag = new Tag();
				wrap(tag).assign(
					{
						// setting temporary id for test purposes
						id: createDummyUuid(tagIndex + 1),
						name: `tag ${tagIndex + 1}`
					},
					{ em }
				);

				em.persist(tag);
				return tag;
			})
		);

		const publishers = await Promise.all(
			[...Array(5)].map(async (_, publisherIndex) => {
				const publisher = new Publisher();
				wrap(publisher).assign(
					{
						id: createDummyUuid(publisherIndex + 1),
						name: faker.company.name(),
						type: PublisherType.GLOBAL
					},
					{ em }
				);

				assert(publisher.name != null, 'publisher.name must NOT be empty!!!');

				em.persist(publisher);
				return publisher;
			})
		);

		const authors = await Promise.all(
			[...Array(5)].map(async (_, authorIndex) => {
				const author = new Author();
				wrap(author).assign(
					{
						// setting temporary id for test purposes
						id: createDummyUuid(authorIndex + 1),
						name: `author ${authorIndex + 1}`,
						email: faker.internet.email(),
						born: new Date(new Date().setFullYear(1994))
					},
					{ em }
				);

				em.persist(author);
				return author;
			})
		);

		await Promise.all(
			[...Array(5)].map(async (_, bookIndex) => {
				const book = new Book();
				wrap(book).assign(
					{
						// setting temporary id for test purposes
						id: createDummyUuid(bookIndex + 1),
						author: orm.em.getRepository(Author).getReference(authors[bookIndex].id),
						publisher: orm.em.getRepository(Publisher).getReference(publishers[bookIndex].id),
						title: `title ${bookIndex + 1}`
					},
					{ em }
				);

				book.tags.add(orm.em.getRepository(Tag).getReference(tags[bookIndex].id));

				em.persist(book);
				return book;
			})
		);

		await em.flush();
	} catch (error) {
		console.error('📌 Could not load fixtures', error);
		throw error;
	}
};

export function resetDB() {
	//
}

export const sendLocalQuery = async (
	server: Server,
	query: DocumentNode,
	{
		variables = {},
		headers = {}
	}: {
		variables?: any;
		headers?: { [key: string]: string };
	} = {}
): Promise<any> => {
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
