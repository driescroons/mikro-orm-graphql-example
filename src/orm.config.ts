import { MikroORM } from '@mikro-orm/core';

const sslConfig = {
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
} as Parameters<typeof MikroORM.init>[0];

export default {
  ...(process.env.NODE_ENV === 'production' ? sslConfig : {}),
  tsNode: process.env.NODE_DEV === 'true' ? true : false,
  migrations: {
    pattern: /^[\w-]+\d+\.(js|ts)$/,
    path: process.env.NODE_DEV === 'true' ? './src/migrations' : './dist/src/migrations',
    tableName: 'migrations',
    transactional: true,
    allOrNothing: true,
    wrap: false,
    disableForeignKeys: false,
  },
  clientUrl: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
