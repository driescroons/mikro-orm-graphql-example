import { expect } from 'chai';
import gql from 'graphql-tag';
import Application from '../src/application';
import createSimpleUuid from '../src/utils/helpers/createSimpleUuid.helper';
import { clearDatabase, loadFixtures, sendLocalQuery } from './testingUtils';

// let request: SuperTest<Test>;
let application: Application;

describe('Author tests', async () => {
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

	afterEach(async () => {
		application.httpServer.close();
	});

	it('should get all authors', async () => {
		const response = await sendLocalQuery(gql`
			query {
				getAuthors {
					id
					name
					email
					born
					books {
						id
						title
					}
				}
			}
		`);
		expect(response.body.data.getAuthors).to.be.a('array');
	});

	it('should get author by id', async () => {
		const response = await sendLocalQuery(
			gql(`query {
          getAuthor(id: "${createSimpleUuid(1)}") {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `)
		);

		expect(response.body.data.getAuthor).to.be.a('object');
	});

	it('should create author', async () => {
		const response = await sendLocalQuery(
			gql(`mutation {
          addAuthor (
            input: {
              email: "email@email.com",
              name: "new author",
              born: "${new Date(new Date().setFullYear(1994)).toISOString()}"
            }
          ) {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `)
		);
		expect(response.body.data.addAuthor).to.be.a('object');
	});

	it('should update author', async () => {
		const response = await sendLocalQuery(
			gql(`mutation {
          updateAuthor (input: {
            email: "updated@email.com",
            name: "update name",
            born: "${new Date().toISOString()}"
          }, id: "${createSimpleUuid(1)}") {
            id name born email
            books {
              id title tags {
                id name
              }
            }
          }
        }
        `)
		);
		expect(response.body.data.updateAuthor).to.be.a('object');
	});

	it('should delete author', async () => {
		const response = await sendLocalQuery(
			gql(`mutation {
          deleteAuthor (id: "${createSimpleUuid(1)}")
        }
        `)
		);
		expect(response.body.data.deleteAuthor).to.be.true;
	});
});
