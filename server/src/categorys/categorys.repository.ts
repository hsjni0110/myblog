import { Repository } from "typeorm";
import { CustomRepository } from '../db/typeorm-ex.decorator';
import { Category } from './categorys.entity';

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
	
	
}