import { AuthGuard } from '@nestjs/passport';
import {
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	Body,
	Param,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { Category } from './categorys.entity';
import { CategorysService } from './categorys.service';
import { SubCategory } from './subCategory.entity';
import { Category_dto } from './dto/category.dto';
import { SubCategory_dto } from './dto/subCategory.dto';


@Controller('categorys')
export class CategorysController {
	constructor(private categorysSerivce: CategorysService) {}

	// 메인 카테고리 모두 가져오기
	@Get('/')
	getMainCategorys(): Promise<Category[]> {
		return this.categorysSerivce.getMainCategorys();
	}

	// 메인 카테고리 생성
	@UseGuards(AuthGuard())
	@Post('/maincategory')
	createCategory(@Body() category_dto:Category_dto): Promise<Category> {
		return this.categorysSerivce.createCategory(category_dto);
	}

	// 메인 카테고리 삭제
	@UseGuards(AuthGuard())
	@Delete('/maincategory')
	deleteMainCategory(@Body() category_dto: Category_dto): Promise<void> {
		return this.categorysSerivce.deleteMainCategory(category_dto);
	}
	
	// 서브 카테고리 생성
	@UseGuards(AuthGuard())
	@Post('/subcategory')
	createSubCategory(@Body() subCategory_dto: SubCategory_dto): Promise<SubCategory> {
		return this.categorysSerivce.createSubCategory(subCategory_dto);
	}
	
	// 서브 카테고리 삭제
	@UseGuards(AuthGuard())
	@Delete('/subcategory')
	deleteSubCategory(@Body() subCategory_dto: SubCategory_dto) : Promise<void> {
		return this.categorysSerivce.deleteSubCategory(subCategory_dto);
	}
}