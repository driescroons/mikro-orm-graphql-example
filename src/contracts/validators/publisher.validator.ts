import { IsEnum, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { PublisherType } from '../enums/publisherType.enum';

@InputType()
export class PublisherValidator {
	@Field()
	@IsString()
	public name: string;

	@Field(() => PublisherType)
	@IsEnum(PublisherType)
	public type: PublisherType;
}
