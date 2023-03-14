import gql from 'graphql-tag';
import { sendTestRequest } from './testingUtils';
import { expect, test, it, beforeEach, beforeAll, afterAll } from 'vitest';

it('Example', async () => {
	const response = await sendTestRequest(gql`
		query {
			__typename
		}
	`);

	expect(response).toEqual({
		data: {
			__typename: 'Query'
		}
	});
});
