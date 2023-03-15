import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class TagValidator {
	@Field(() => String)
	@IsString()
	public name: string;
}

export default TagValidator;
