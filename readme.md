# mikro-orm-graphql-example

One model to rule them all.

This project is a proof of concept I







Any mutation of state generates a message on the console





## 🏷️ Features

* Automatic GraphQL API generation
* Automatic DB Schema generation
* Automatic event generation on mutations
* Database up/down migrations



## 📦 TechStack

- [GraphQL](https://graphql.org/) - A fantastic middleware tech
- [TypeGraphQL](https://typegraphql.com/) - A code to graphql schema generator
- [MikroORM](https://mikro-orm.io/) - Probably the best ORM for Typescript (support identity maps and automatic transactions)
- [Typescript](https://www.typescriptlang.org/) - A somehow decent typed language
- [Mocha](https://mochajs.org/) - An old testing framework (I tried vitest but it doesn't support reflect-metadata)
- [Ulid](https://github.com/ulid/spec) - A robust, distributed, timebased GUID
- [Apollo Server](https://www.apollographql.com/) - An good looking GrapQL server - yet a resource hog
- graphql-fields-to-relations - a graphql/database relationship optimizer (now bundled in the repo)



## ✨ Installation & Usage

The application requires `nodejs` and `docker` installed on your computer.

1. Install dependencies via `pnpm i`or `npm i`
2. Started the dockerized Postgres database via `docker-compose up -d`
3. Load fixtures `pnpm loadFixtures`, this will create the supporting schema in the database
4. Start the graphQL server via `pnpm start` (for prod) or `pnpm dev`(for dev)
5. Open a browser to [localhost:4000/graphql](http://localhost:4000/graphql)



## ⚡️ Testing

Unit tests are fully implemented and run locally

1. `pnpm test`



## 🗂️ Migrations

MikroORM supports database migrations - no migrations are bundled in the original code.

After developing a feature, run the following commands to create an incremental migration:

```
pnpm mikro-orm schema:drop --run
pnpm mikro-orm migration:up
pnpm mikro-orm migration:create
```



## 👤 Author

Olivier Refalo

