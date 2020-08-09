import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import Application from 'application';
import { SuperTest, Test } from 'supertest';
import supertest = require('supertest');
import { clearDatabase } from 'utils/services/clearDatabase.service';
import { loadFixtures } from 'utils/services/loadFixtures.service';

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager<IDatabaseDriver<Connection>>;

describe('Sample tests', async () => {
  before(async () => {
    application = new Application();
    await application.connect();
    await application.init();

    em = application.orm.em.fork();

    request = supertest(application.host);
  });

  beforeEach(async () => {
    await clearDatabase(application.orm);
    await loadFixtures(application.orm);
  });

  after(async () => {
    application.server.close();
  });

  it('should clear database and load fixtures', () => {
    console.log('🚀 Database cleared, fixtures loaded');
  });
});
