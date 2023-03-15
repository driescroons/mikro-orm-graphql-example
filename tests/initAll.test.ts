import { afterAll, beforeAll, describe, it } from 'vitest';
import Application from '../src/application';
import { clearDatabase, loadFixtures } from './testingUtils';

let application: Application;

describe('Sample tests', async () => {
	beforeAll(async () => {
		application = new Application();
		await application.init();
	});

	afterAll(async () => {
		application.stop();
	});

	it('Init database and load fixtures', async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
		console.log('🚀 Database cleared, fixtures loaded');
	});
});
