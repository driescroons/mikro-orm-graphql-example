import { expect } from 'chai';
import gql from 'graphql-tag';
import Application from '../src/application';
import createDummyUuid from './createDummyUuid.helper';

import { clearDatabase, loadFixtures, sendLocalQuery } from './testingUtils';

let application: Application;

describe('Author tests', async () => {
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

	afterEach(async () => {
		//
	});

	it('should get all authors', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql`
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
			`
		);
		expect(response.data.getAuthors).to.be.a('array');
	});

	it('should get author by id', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`query {
	      getAuthor(id: "${createDummyUuid(1)}") {
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

		expect(response.data.getAuthor).to.be.a('object');
	});

	it('should create author', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
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
		expect(response.data.addAuthor).to.be.a('object');
	});

	it('should update author', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`mutation {
	      updateAuthor (input: {
	        email: "updated@email.com",
	        name: "update name",
	        born: "${new Date().toISOString()}"
	      }, id: "${createDummyUuid(1)}") {
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
		expect(response.data.updateAuthor).to.be.a('object');
	});

	it('should delete author', async () => {
		const response = await sendLocalQuery(
			application.httpServer,
			gql(`mutation {
	      deleteAuthor (id: "${createDummyUuid(1)}")
	    }
	    `)
		);
		expect(response.data.deleteAuthor).to.be.true;
	});
});
