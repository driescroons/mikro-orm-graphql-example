import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import Application from "application";
import { SuperTest, Test } from "supertest";
import supertest = require("supertest");
import { clearDatabase } from "utils/services/clearDatabase.service";
import { loadFixtures } from "utils/services/loadFixtures.service";

let request: SuperTest<Test>;
let application: Application;
let em: EntityManager<IDatabaseDriver<Connection>>;

describe("Sample tests", async () => {
  before(async () => {
    application = new Application();
    await application.connect();
    await application.init();

    em = application.orm.em.fork();

    request = supertest(application.app);
  });

  after(async () => {
    application.httpServer.close();
  });

  it("Init database and load fixtures", async () => {
    await clearDatabase(application.orm);
    await loadFixtures(application.orm);
    console.log("🚀 Database cleared, fixtures loaded");
  });
});
