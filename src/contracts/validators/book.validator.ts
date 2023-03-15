import { IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class BookValidator {
	@Field(() => String)
	@IsString()
	public title: string;
}

export default BookValidator;
