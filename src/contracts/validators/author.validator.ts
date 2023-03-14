import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class AuthorValidator {
	@Field()
	@IsString()
	public name: string;

	@Field()
	@IsEmail()
	public email: string;

	@Field({ nullable: true })
	@IsDate()
	@IsOptional()
	public born?: Date;
}

export default AuthorValidator;
