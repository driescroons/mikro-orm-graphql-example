import { Field, ID, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';

import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';

@ObjectType({ isAbstract: true })
export class Base<T extends { id: string }> extends BaseEntity<T, 'id'> {
	@Field(() => ID)
	@PrimaryKey({ type: 'uuid' })
	public id: string = v4();

	@Field()
	@Property()
	public createdAt: Date = new Date();

	@Field()
	@Property({ onUpdate: () => new Date() })
	public updatedAt: Date = new Date();

	constructor(body = {}) {
		super();
		this.assign(body);
	}
}
