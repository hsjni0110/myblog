import { IsNotEmpty } from 'class-validator';
import { Category } from '../categorys.entity';

export class SubCategory_dto {
	@IsNotEmpty()
	category_name: string;
	
	@IsNotEmpty()
	main_category: string;
}