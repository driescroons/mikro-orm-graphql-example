import Application from 'application';
import { clearDatabase, loadFixtures } from 'testingUtils';
import { afterAll, beforeAll, describe, it } from 'vitest';

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