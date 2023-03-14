import 'dotenv/config';
import 'reflect-metadata';

import Application from './application';
(async () => {
	const application = new Application();
	await application.init();
})();
