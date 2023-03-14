import gql from 'graphql-tag';
import { afterAll, beforeAll, beforeEach, expect, it, test } from 'vitest';

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
