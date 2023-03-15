import Application from '../src/application';
import { clearDatabase, loadFixtures } from './testingUtils';

let application: Application;

describe('Sample tests', async () => {
	before(async () => {
		application = new Application();
		await application.init();
	});

	after(async () => {
		application.stop();
	});

	it('Init database and load fixtures', async () => {
		await clearDatabase(application.orm);
		await loadFixtures(application.orm);
		console.log('🚀 Database cleared, fixtures loaded');
	});
});
