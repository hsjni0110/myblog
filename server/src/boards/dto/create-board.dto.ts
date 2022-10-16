import { IsNotEmpty } from 'class-validator';
import { Category } from '../../categorys/categorys.entity';

export class CreateBoardDto {
	@IsNotEmpty()
	title: string;
	
	@IsNotEmpty()
	description: string;
	
	@IsNotEmpty()
	mainCategory: string;
	
	@IsNotEmpty()
	subCategory: string;
	
	@IsNotEmpty()
	ThumnailUrl: string;
}