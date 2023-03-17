import { Field, ObjectType } from 'type-graphql';
import AuthorValidator from '../contracts/validators/author.validator';
import { Base } from './base.entity';
import { Book } from './book.entity';

import { Cascade, Collection, Entity, EntityManager, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core';

@ObjectType()
@Entity()
export class Author extends Base<Author> {
	@Field(() => String)
	@Property()
	public name: string;

	@Field(() => String)
	@Property()
	@Unique()
	public email: string;

	//@Property()
	//public termsAccepted: boolean;

	@Field(() => Date, { nullable: true })
	@Property({ nullable: true })
	public born?: Date;

	@Field(() => [Book])
	@OneToMany(() => Book, (b: Book) => b.author, { cascade: [Cascade.ALL] })
	public books = new Collection<Book>(this);

	@Field(() => Book, { nullable: true })
	@ManyToOne(() => Book, { nullable: true })
	public favouriteBook?: Book;

	constructor(body: AuthorValidator, em: EntityManager) {
		super(body, em);
	}
}
