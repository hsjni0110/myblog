import { IsNotEmpty } from 'class-validator';

export class BoardWithCategory {
	@IsNotEmpty()
	mainCategory: string;
	
	@IsNotEmpty()
	subCategory: string;
}