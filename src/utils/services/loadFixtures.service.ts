import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { PublisherType } from 'contracts/enums/publisherType.enum';
import { Author } from 'entities/author.entity';
import { Book } from 'entities/book.entity';
import { Publisher } from 'entities/publisher.entity';
import { Tag } from 'entities/tag.entity';
import * as faker from 'faker';
import createSimpleUuid from 'utils/helpers/createSimpleUuid.helper';

export const loadFixtures = async (orm: MikroORM<IDatabaseDriver<Connection>>): Promise<void> => {
  try {
    const tags = await Promise.all(
      [...Array(5)].map(async (_, tagIndex) => {
        const tag = new Tag({
          name: `tag ${tagIndex + 1}`,
        });

        // setting temporary id for test purposes
        tag.id = createSimpleUuid(tagIndex + 1);

        await orm.em.persist(tag);
        return tag;
      }),
    );

    const publishers = await Promise.all(
      [...Array(5)].map(async (_, publisherIndex) => {
        const publisher = new Publisher({
          name: faker.company.companyName(),
          type: PublisherType.GLOBAL,
        });

        // setting temporary id for test purposes
        publisher.id = createSimpleUuid(publisherIndex + 1);

        await orm.em.persist(publisher);
        return publisher;
      }),
    );

    const authors = await Promise.all(
      [...Array(5)].map(async (_, authorIndex) => {
        const author = new Author({
          name: `author ${authorIndex + 1}`,
          email: faker.internet.email(),
          born: new Date(new Date().setFullYear(1994)),
        });

        // setting temporary id for test purposes
        author.id = createSimpleUuid(authorIndex + 1);

        await orm.em.persist(author);
        return author;
      }),
    );

    await Promise.all(
      [...Array(5)].map(async (_, bookIndex) => {
        const book = new Book({
          title: `title ${bookIndex + 1}`,
        });

        // setting temporary id for test purposes
        book.id = createSimpleUuid(bookIndex + 1);
        book.tags = [orm.em.getRepository(Tag).getReference(tags[bookIndex].id)];
        book.author = orm.em.getRepository(Author).getReference(authors[bookIndex].id);
        book.publisher = orm.em.getRepository(Publisher).getReference(publishers[bookIndex].id);

        await orm.em.persist(book);
        return book;
      }),
    );

    await orm.em.flush();
  } catch (error) {
    console.error('📌 Could not load fixtures', error);
  }
};
