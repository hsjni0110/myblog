import { IsNotEmpty } from 'class-validator';

export class CommentDto {
	@IsNotEmpty()
	name: string;
	
	@IsNotEmpty()
	contents: string;
	
	@IsNotEmpty()
	password: string;
}