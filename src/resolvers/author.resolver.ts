import AuthorValidator from 'contracts/validators/Author.validator';
import { Author } from 'entities/author.entity';
import { GraphQLResolveInfo } from 'graphql';
import fieldsToRelations from 'graphql-fields-to-relations';
import { Arg, Ctx, Info, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from 'utils/interfaces/context.interface';

@Resolver(() => Author)
export class AuthorResolver {
  @Query(() => [Author])
  public async getAuthors(@Ctx() ctx: MyContext, @Info() info: GraphQLResolveInfo): Promise<Author[]> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Author).findAll(relationPaths);
  }

  @Query(() => Author, { nullable: true })
  public async getAuthor(
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Author | null> {
    const relationPaths = fieldsToRelations(info);
    return ctx.em.getRepository(Author).findOne({ id }, relationPaths);
  }

  @Mutation(() => Author)
  public async addAuthor(@Arg('input') input: AuthorValidator, @Ctx() ctx: MyContext): Promise<Author> {
    const author = new Author(input);
    await ctx.em.persist(author).flush();
    return author;
  }

  @Mutation(() => Author)
  public async updateAuthor(
    @Arg('input') input: AuthorValidator,
    @Arg('id') id: string,
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Author> {
    const relationPaths = fieldsToRelations(info);
    const author = await ctx.em.getRepository(Author).findOneOrFail({ id }, relationPaths);
    author.assign(input);
    await ctx.em.persist(author).flush();
    return author;
  }

  @Mutation(() => Boolean)
  public async deleteAuthor(@Arg('id') id: string, @Ctx() ctx: MyContext): Promise<boolean> {
    const author = await ctx.em.getRepository(Author).findOneOrFail({ id });
    await ctx.em.getRepository(Author).remove(author).flush();
    return true;
  }
}
