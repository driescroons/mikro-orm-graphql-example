import gql from 'graphql-tag';
import { expect } from 'chai';
import Application from '../src/application';
import createSimpleUuid from '../src/utils/helpers/createSimpleUuid.helper';
import { clearDatabase, loadFixtures, sendLocalQuery } from './testingUtils';

// let request: SuperTest<Test>;
let application: Application;
// let em: EntityManager<IDatabaseDriver<Connection>>;

describe('Book tests', async () => {
	before(async () => {
		application = new Application();
		await application.init();
	});
	after(async () => {
		application.stop();
	});

	beforeEach(async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
	});

	it('should get books', async () => {
		const response = await sendLocalQuery(
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
		const response = await sendLocalQuery(
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
		const response = await sendLocalQuery(
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
		const response = await sendLocalQuery(
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
		const response = await sendLocalQuery(
			gql(`mutation {
          deleteBook (id: "${createSimpleUuid(1)}")
        }
        `)
		);
		expect(response.body.data.deleteBook).to.be.true;
	});
});
