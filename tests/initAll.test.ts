import Application from 'application';

import { clearDatabase } from 'utils/services/clearDatabase.service';
import { loadFixtures } from 'utils/services/loadFixtures.service';
import { describe, it, beforeAll, afterAll } from 'vitest';

// let request: SuperTest<Test>;
let application: Application;
// let em: EntityManager<IDatabaseDriver<Connection>>;

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
