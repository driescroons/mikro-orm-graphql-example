import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import TagValidator from 'contracts/validators/tag.validator';
import { Book } from 'entities/book.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

@ObjectType()
@Entity()
export class Tag extends Base<Tag> {
  @Field()
  @Property()
  public name: string;

  @Field(() => [Book])
  @ManyToMany(() => Book, (b: Book) => b.tags)
  public books = new Collection<Book>(this);

  constructor(body: TagValidator) {
    super(body);
  }
}
