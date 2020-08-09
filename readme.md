# mikro-orm-graphql-example

A MikroORM boilerplate for GraphQL made with Typescript using TypeGraphQL

## 📦 Packages

- [MikroORM](https://mikro-orm.io/)
- [GraphQL](https://graphql.org/)
- [TypeGraphQL](https://typegraphql.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Mocha](https://mochajs.org/)

I've also created a [package](https://github.com/driescroons/graphql-fields-to-relations) (`graphql-fields-to-relations`) that converts the input fields to a list of relation strings. These strings can be passed directly to MikroOrm, in order to load the requested relations.

___

## ✨ Instalation

1. Install dependencies via `yarn`
2. Create your docker containers via `docker-compose up -d`
3. create .env file based on .env.example

```
PORT=8080
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=mikro-orm-graphql-data
NODE_DEV=false
```

4. Load fixtures `yarn loadFixtures`
5. Run via `yarn start` or `yarn dev`
6. GraphQL API is running on  [localhost:8080/graphql](http://localhost:8080/graphql)

___

## ⚡️ Usage

### Running

Once the server starts, you can access the GraphQL API on [localhost:8080/graphql](http://localhost:8080/graphql).

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
yarn mikro-orm schema:drop --run
yarn mikro-orm migration:up
yarn mikro-orm migration:create
```

___

## 👤 Author

Dries Croons  
Website: [dries.io](http://dries.io)  
Github: [driescroons](http://github.com/driescroons)  
Twitter: [croewens](http://twitter.com/croewens)  

___

## 📢 Shoutouts

Special thanks to [Leslie Jobse](https://github.com/ljobse) and [Sebastiaan Viaene](https://github.com/sebastiaanviaene) from Panenco.  
  
At [Panenco](https://github.com/Panenco) we shape, build & grow digital products from the ground up, with the future in mind.

___

## ⭐️ Support

Please start the repository if this helped you!

___

## ⛑️ Contribution

Want to help contribute to this repository?

- Something's not working? Create an issue!
- Missing some functionality? Feel free to create a pull request!

___

## 🚧 Todo

- Better error handling
