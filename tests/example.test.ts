import gql from 'graphql-tag';
import { expect, it } from 'vitest';
import { sendTestRequest } from './testingUtils';

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
