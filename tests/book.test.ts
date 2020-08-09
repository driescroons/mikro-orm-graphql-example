import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import Application from 'application';
import { expect } from 'chai';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import createSimpleUuid from 'utils/helpers/createSimpleUuid.helper';
import { clearDatabase } from 'utils/services/clearDatabase.service';
import { loadFixtures } from 'utils/services/loadFixtures.service';

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager<IDatabaseDriver<Connection>>;

describe('Book tests', async () => {
  before(async () => {
    application = new Application();
    await application.connect();
    await application.init();

    em = application.orm.em.fork();

    request = supertest(application.host);
  });

  beforeEach(async () => {
    await clearDatabase(application.orm);
    await loadFixtures(application.orm);
  });

  after(async () => {
    application.server.close();
  });

  it('should get books', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getBooks {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getBooks).to.be.a('array');
  });

  it('should get book by id', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `query {
          getBook(id: "${createSimpleUuid(1)}") {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.getBook).to.be.a('object');
  });

  it('should create book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          addBook (
            input: {
              title: "new Book",
            },
            authorId: "${createSimpleUuid(1)}"
            publisherId: "${createSimpleUuid(1)}"
          ) {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.addBook).to.be.a('object');
  });

  it('should update book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          updateBook (input: {
            title: "updated book",
          }, id: "${createSimpleUuid(1)}") {
            id title author {
              id email
            }
            publisher {
              id name
            }
            tags {
              id name books {
                id
              }
            }
          }
        }
        `,
      })
      .expect(200);

    expect(response.body.data.updateBook).to.be.a('object');
  });

  it('should delete book', async () => {
    const response = await request
      .post('/graphql')
      .send({
        query: `mutation {
          deleteBook (id: "${createSimpleUuid(1)}")
        }
        `,
      })
      .expect(200);

    expect(response.body.data.deleteBook).to.be.true;
  });
});
