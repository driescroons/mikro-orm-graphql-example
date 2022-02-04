import BookValidator from "contracts/validators/Book.validator";
import { Author } from "entities/author.entity";
import { Book } from "entities/book.entity";
import { Publisher } from "entities/publisher.entity";
import { GraphQLResolveInfo } from "graphql";
import fieldsToRelations from "graphql-fields-to-relations";
import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "utils/interfaces/context.interface";
import { PopulateHint } from "@mikro-orm/core";

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book])
  public async getBooks(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Book[]> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Book).findAll({
      populate: relationPaths as (keyof Book)[],
      populateWhere: PopulateHint.INFER,
    });
  }

  @Query(() => Book, { nullable: true })
  public async getBook(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Book | null> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Book).findOne(
      { id },
      {
        populate: relationPaths as (keyof Book)[],
        populateWhere: PopulateHint.INFER,
      }
    );
  }

  @Mutation(() => Book)
  public async addBook(
    @Arg("input") input: BookValidator,
    @Arg("authorId") authorId: string,
    @Arg("publisherId", { nullable: true }) publisherId: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Book> {
    const book = new Book(input);
    book.author = await ctx.em.getRepository(Author).findOneOrFail(
      { id: authorId },
      {
        populate: fieldsToRelations(info, {
          root: "author",
        }) as (keyof Author)[],
        populateWhere: PopulateHint.INFER,
      }
    );

    if (publisherId) {
      book.publisher = await ctx.em.getRepository(Publisher).findOneOrFail(
        { id: publisherId },
        {
          populate: fieldsToRelations(info, {
            root: "publisher",
          }) as (keyof Publisher)[],
          populateWhere: PopulateHint.INFER,
        }
      );
    }
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Book)
  public async updateBook(
    @Arg("input") input: BookValidator,
    @Arg("id") id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<Book> {
    const relationPaths = fieldsToRelations(info);
    const book = await ctx.em.getRepository(Book).findOneOrFail(
      { id },
      {
        populate: relationPaths as (keyof Book)[],
        populateWhere: PopulateHint.INFER,
      }
    );
    book.assign(input);
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Boolean)
  public async deleteBook(
    @Arg("id") id: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const book = await ctx.em.getRepository(Book).findOneOrFail({ id });
    await ctx.em.getRepository(Book).remove(book).flush();
    return true;
  }
}
