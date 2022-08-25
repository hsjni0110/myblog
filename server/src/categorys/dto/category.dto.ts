import { IsNotEmpty } from 'class-validator';

export class Category_dto {
	@IsNotEmpty()
	category_name: string;
}