# mikro-orm-graphql-example

What is the point about this Proof Of Concept?

1.

## 📦 Packages

- [MikroORM](https://mikro-orm.io/) Probably the best ORM for Typescript
- [GraphQL](https://graphql.org/) A fantastic middleware tech
- [TypeGraphQL](https://typegraphql.com/) (2.0 beta) A code to graphql generator
- [Typescript](https://www.typescriptlang.org/) A decent somehow typed language
- [Mocha](https://mochajs.org/) An old testing framework
- graphql-fields-to-relations - a graphql/databse relationship optimizer

---

## ✨ Installation

1. Install dependencies via `pnpm i`
2. Create your docker containers via `docker-compose up -d`
3. Review the .env file and ensure it will work in your environment
4. Load fixtures `pnpm loadFixtures`
5. Run via `pnpm start` or `pnpm dev`
6. GraphQL API is started on [localhost:4000/graphql](http://localhost:4000/graphql)
7. Mutation change sets are displayed on the console

---

## ⚡️ Usage

### Running

Once the server starts, you can access the GraphQL API on [localhost:4000/graphql](http://localhost:4000/graphql).

I've included 4 options to run this application:

#### Run with Node

Run the regular start command

#### Run with ts-node-dev

Run and watch the application in Typescript. Checkout [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

#### Run with debugger

I've added the launch script for VSCode in the repository. You can start the application by going to the Debug and Run tab and clicking on `Debug Application`

#### Test driven with Mocha Test Explorer

[Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) allows you to run and debug your mocha tests from a nice UI within VSCode. Install the extension and get going!

![Mocha Test Explorer example](https://i.imgur.com/5WTSij5.gif)

### Migrations

After developing a feature, run the following commands to create a migration from the previous migration schema state:

```
pnpm mikro-orm schema:drop --run
pnpm mikro-orm migration:up
pnpm mikro-orm migration:create
```

---

## 👤 Author

Dries Croons  
Website: [dries.io](http://dries.io)  
Github: [driescroons](http://github.com/driescroons)  
Twitter: [croewens](http://twitter.com/croewens)

---

## ⛑️ Contribution

Want to help contribute to this repository?

- Something's not working? Got a question? Create an issue!
- Missing some functionality? Feel free to create a pull request!

---

## 🚧 Todo

- Better error handling
