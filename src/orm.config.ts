import { MikroORM } from "@mikro-orm/core"
import { AllSubscriber } from "subscribers/all.subscriber"

export default {
  subscribers: [new AllSubscriber()],
  migrations: {
    path: "./src/migrations",
    tableName: "migrations",
    transactional: false,
    disableForeignKeys: true,
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
  },
  tsNode: process.env.NODE_DEV === "true" ? true : false,
  user: "root",
  password: "root",
  dbName: "mikro-orm-graphql-data",
  host: "localhost",
  port: 5432,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  type: "postgresql",
} as Parameters<typeof MikroORM.init>[0]
