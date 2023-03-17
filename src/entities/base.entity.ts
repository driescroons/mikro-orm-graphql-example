import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';
import { UlidMonotonic } from 'id128';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export class Base<T extends { id: string }> extends BaseEntity<T, 'id'> {
	@Field(() => ID)
	@PrimaryKey({ type: 'uuid' })
	public id: string = UlidMonotonic.generate().toRaw();

	@Field(() => Date)
	@Property()
	public createdAt: Date = new Date();

	@Field(() => Date)
	@Property({ onUpdate: () => new Date() })
	public updatedAt: Date = new Date();

	constructor() {
		super();
	}
}
