import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import Application from './application';

(async () => {
  const application = new Application();
  await application.connect();
  await application.init();
})();
