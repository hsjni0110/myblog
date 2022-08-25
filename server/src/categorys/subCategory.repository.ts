import { Repository } from "typeorm";
import { CustomRepository } from '../db/typeorm-ex.decorator';
import { SubCategory } from './subCategory.entity';

@CustomRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {
	
	
}