import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import "express-async-errors";

import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { PublisherType } from "contracts/enums/publisherType.enum";
import cors from "cors";
import { GraphQLSchema } from "graphql";
import type { Server } from "http";
import ormConfig from "orm.config";
import { AuthorResolver } from "resolvers/author.resolver";
import { BookResolver } from "resolvers/book.resolver";
import { buildSchema, registerEnumType } from "type-graphql";

// TODO: create service for this
registerEnumType(PublisherType, {
  name: "PublisherType",
  description: "Type of the publisher",
});

export default class Application {
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  public app: express.Application;
  public httpServer: Server;

  public connect = async (): Promise<void> => {
    try {
      this.orm = await MikroORM.init(ormConfig);
      const migrator = this.orm.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (migrations && migrations.length > 0) {
        await migrator.up();
      }
    } catch (error) {
      console.error("📌 Could not connect to the database", error);
      throw Error(error);
    }
  };

  public init = async (): Promise<void> => {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.app.use(cors());

    try {
      const schema: GraphQLSchema = await buildSchema({
        resolvers: [BookResolver, AuthorResolver],
        dateScalarMode: "isoDate",
      });

      const server = new ApolloServer({
        schema,
        context: () => {
          return { em: this.orm.em.fork() };
        },
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
        ],
      });
      await server.start();
      server.applyMiddleware({ app: this.app });
      await new Promise<void>((resolve) =>
        this.httpServer.listen({ port: 4000 }, resolve)
      );
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    } catch (error) {
      console.error("📌 Could not start server", error);
    }
  };
}
