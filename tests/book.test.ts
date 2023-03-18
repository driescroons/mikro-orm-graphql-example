import { expect } from 'chai';
import gql from 'graphql-tag';
import Application from '../src/application';

import createDummyUuid from './createDummyUuid.helper';
import { clearDatabase, loadFixtures, sendLocalQuery } from './testingUtils';

let application: Application;

describe('Book tests', async () => {
	before(async () => {
		application = new Application();
		await application.init();
	});
	after(async () => {
		await application.stop();
	});

	beforeEach(async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
	});

	it('should get books', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
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
		expect(response.data.getBooks).to.be.a('array');
	});

	it('should get book by id', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`query {
          getBook(id: "${createDummyUuid(1)}") {
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
		expect(response.data.getBook).to.be.a('object');
	});

	it('should create book', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`mutation {
          addBook (
            input: {
              title: "new Book",
            },
            authorId: "${createDummyUuid(1)}"
            publisherId: "${createDummyUuid(1)}"
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
		expect(response.data.addBook).to.be.a('object');
	});

	it('should update book', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`mutation {
          updateBook (input: {
            title: "updated book",
          }, id: "${createDummyUuid(1)}") {
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
		expect(response.data.updateBook).to.be.a('object');
	});

	it('should delete book', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`mutation {
          deleteBook (id: "${createDummyUuid(1)}")
        }
        `)
		);
		expect(response.data.deleteBook).to.be.true;
	});
});
