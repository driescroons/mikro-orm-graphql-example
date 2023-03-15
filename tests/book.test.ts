import Application from 'application';
import gql from 'graphql-tag';
import { clearDatabase, loadFixtures, sendTestRequest } from 'testingUtils';
import createSimpleUuid from 'utils/helpers/createSimpleUuid.helper';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

// let request: SuperTest<Test>;
let application: Application;
// let em: EntityManager<IDatabaseDriver<Connection>>;

describe('Book tests', async () => {
	beforeAll(async () => {
		application = new Application();
		await application.init();
	});

	beforeEach(async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
	});

	afterAll(async () => {
		application.httpServer.close();
	});

	it('should get books', async () => {
		const response = await sendTestRequest(
			gql(`query {
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
        `)
		);
		expect(response.body.data.getBooks).to.be.a('array');
	});

	it('should get book by id', async () => {
		const response = await sendTestRequest(
			gql(`query {
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
        `)
		);
		expect(response.body.data.getBook).to.be.a('object');
	});

	it('should create book', async () => {
		const response = await sendTestRequest(
			gql(`mutation {
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
        `)
		);
		expect(response.body.data.addBook).to.be.a('object');
	});

	it('should update book', async () => {
		const response = await sendTestRequest(
			gql(`mutation {
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
        `)
		);
		expect(response.body.data.updateBook).to.be.a('object');
	});

	it('should delete book', async () => {
		const response = await sendTestRequest(
			gql(`mutation {
          deleteBook (id: "${createSimpleUuid(1)}")
        }
        `)
		);
		expect(response.body.data.deleteBook).to.be.true;
	});
});
