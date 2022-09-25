import { IsNotEmpty } from 'class-validator';

export class DeleteDto {
	@IsNotEmpty()
	name: string;
	
	@IsNotEmpty()
	password: string;
}