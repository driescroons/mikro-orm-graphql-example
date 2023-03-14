import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import BookValidator from 'contracts/validators/Book.validator';
import { Author } from 'entities/author.entity';
import { Publisher } from 'entities/publisher.entity';
import { Tag } from 'entities/tag.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

@ObjectType()
@Entity()
export class Book extends Base<Book> {
	@Field()
	@Property()
	public title: string;

	@Field(() => Author)
	@ManyToOne(() => Author, { onDelete: 'cascade' })
	public author: Author;

	@Field(() => Publisher, { nullable: true })
	@ManyToOne(() => Publisher, {
		cascade: [Cascade.PERSIST, Cascade.REMOVE],
		nullable: true
	})
	public publisher?: Publisher;

	@Field(() => [Tag])
	@ManyToMany(() => Tag)
	public tags = new Collection<Tag>(this);

	constructor(body: BookValidator) {
		super(body);
	}
}
