import Application from 'application';
import { DocumentNode, print } from 'graphql';
import request from 'supertest';

let cachedServer: any;

const createServer = async () => {
	const app = new Application();
	await app.init();
	return app.httpServer;
};

export function resetDB() {
	
}

export const sendTestRequest = async (
	query: DocumentNode,
	{
		variables = {},
		headers = {}
	}: {
		variables?: any;
		headers?: { [key: string]: string };
	} = {}
): Promise<any> => {
	const server = cachedServer ?? (await createServer());
	cachedServer = server;
	const requestBuilder = request(server).post('/graphql');

	Object.entries(headers).forEach(([key, value]) => {
		requestBuilder.set(key, value);
	});
	const { text } = await requestBuilder.send({
		variables,
		query: print(query)
	});
	return JSON.parse(text);
};
