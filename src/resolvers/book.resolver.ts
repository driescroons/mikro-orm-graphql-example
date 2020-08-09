import BookValidator from 'contracts/validators/Book.validator';
import { Author } from 'entities/author.entity';
import { Book } from 'entities/book.entity';
import { Publisher } from 'entities/publisher.entity';
import { GraphQLResolveInfo } from 'graphql';
import { Arg, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql';
import { getRelationsFromInfo } from 'utils/helpers/getRelationsFromInfo.helper';
import { MyContext } from 'utils/interfaces/context.interface';

@Resolver(() => Book)
export class BookResolver {
  @Query(() => [Book])
  public async getBooks(@Ctx() ctx: MyContext, @Info() info: GraphQLResolveInfo): Promise<Book[]> {
    const relationPaths = getRelationsFromInfo(info);
    return ctx.em.getRepository(Book).findAll(relationPaths);
  }

  @Query(() => Book, { nullable: true })
  public async getBook(
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Book | null> {
    const relationPaths = getRelationsFromInfo(info);
    return ctx.em.getRepository(Book).findOne({ id }, relationPaths);
  }

  @Mutation(() => Book)
  public async addBook(
    @Arg('input') input: BookValidator,
    @Arg('authorId') authorId: string,
    @Arg('publisherId', { nullable: true }) publisherId: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Book> {
    const book = new Book(input);
    book.author = await ctx.em
      .getRepository(Author)
      .findOneOrFail({ id: authorId }, getRelationsFromInfo(info, 'author'));

    if (publisherId) {
      book.publisher = await ctx.em
        .getRepository(Publisher)
        .findOneOrFail({ id: publisherId }, getRelationsFromInfo(info, 'publisher'));
    }
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Book)
  public async updateBook(
    @Arg('input') input: BookValidator,
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Book> {
    const relationPaths = getRelationsFromInfo(info);
    const book = await ctx.em.getRepository(Book).findOneOrFail({ id }, relationPaths);
    book.assign(input);
    await ctx.em.persist(book).flush();
    return book;
  }

  @Mutation(() => Boolean)
  public async deleteBook(@Arg('id') id: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const book = await ctx.em.getRepository(Book).findOneOrFail({ id });
    await ctx.em.getRepository(Book).remove(book).flush();
    return true;
  }
}
