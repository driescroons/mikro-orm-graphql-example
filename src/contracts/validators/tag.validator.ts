import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class TagValidator {
	@Field()
	@IsString()
	public name: string;
}

export default TagValidator;
