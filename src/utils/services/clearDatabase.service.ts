import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";

export const clearDatabase = async (
  orm: MikroORM<IDatabaseDriver<Connection>>
): Promise<void> => {
  await orm
    .getSchemaGenerator()
    .dropSchema({ wrap: true, dropMigrationsTable: true });
  const migrator = orm.getMigrator();
  const migrations = await migrator.getPendingMigrations();
  if (migrations && migrations.length > 0) {
    await migrator.up();
  }

  // additional sync for development
  // this way we can just create 1 migration after development
  await orm.getSchemaGenerator().updateSchema();
};
