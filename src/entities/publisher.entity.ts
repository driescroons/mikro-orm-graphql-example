import { Field, ObjectType } from 'type-graphql';
import { PublisherType } from '../contracts/enums/publisherType.enum';
import { Base } from './base.entity';
import { Book } from './book.entity';

import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

@ObjectType()
@Entity()
export class Publisher extends Base<Publisher> {
	@Field(() => String)
	@Property()
	public name: string;

	@Field(() => PublisherType)
	@Enum(() => PublisherType)
	public type: PublisherType;

	@Field(() => [Book])
	@OneToMany(() => Book, (b: Book) => b.publisher)
	public books = new Collection<Book>(this);

	constructor() {
		super();
	}
}
