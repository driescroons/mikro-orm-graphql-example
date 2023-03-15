import TagValidator from '../contracts/validators/tag.validator';
import { Book } from './book.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from './base.entity';

import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';

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
