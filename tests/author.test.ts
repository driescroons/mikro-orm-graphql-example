import Application from '../src/application';
import gql from 'graphql-tag';
import createSimpleUuid from '../src/utils/helpers/createSimpleUuid.helper';
import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { clearDatabase, loadFixtures, sendTestRequest } from './testingUtils';

// let request: SuperTest<Test>;
let application: Application;

describe('Author tests', async () => {
	beforeAll(async () => {
		application = new Application();
		await application.init();
	});

	beforeEach(async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
	});

	afterEach(async () => {
		application.httpServer.close();
	});

	it('should get all authors', async () => {
		const response = await sendTestRequest(gql`
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
		const response = await sendTestRequest(
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
		const response = await sendTestRequest(
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
		const response = await sendTestRequest(
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
		const response = await sendTestRequest(
			gql(`mutation {
          deleteAuthor (id: "${createSimpleUuid(1)}")
        }
        `)
		);
		expect(response.body.data.deleteAuthor).to.be.true;
	});
});
