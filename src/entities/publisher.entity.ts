import { PublisherType } from 'contracts/enums/publisherType.enum';
import { PublisherValidator } from 'contracts/validators/publisher.validator';
import { Book } from 'entities/book.entity';
import { Field, ObjectType } from 'type-graphql';
import { Base } from 'utils/entities/base.entity';

import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';

@ObjectType()
@Entity()
export class Publisher extends Base<Publisher> {
	@Field()
	@Property()
	public name: string;

	@Field(() => PublisherType)
	@Enum(() => PublisherType)
	public type: PublisherType;

	@Field(() => [Book])
	@OneToMany(() => Book, (b: Book) => b.publisher)
	public books = new Collection<Book>(this);

	constructor(body: PublisherValidator) {
		super(body);
	}
}
