import { Injectable } from '@nestjs/common';
import { Category } from './categorys.entity';
import { CategoryRepository } from './categorys.repository';
import { SubCategoryRepository } from './subCategory.repository';
import { SubCategory } from './subCategory.entity';
import { Category_dto } from './dto/category.dto';
import { SubCategory_dto } from './dto/subCategory.dto';

@Injectable()
export class CategorysService {
	constructor(
		private categoryRepository: CategoryRepository,
		private subCategoryRepository: SubCategoryRepository
	) {}

	// 메인 카테고리 가져오기
	async getMainCategorys(): Promise<Category[]> {
		const category_data = await this.categoryRepository.find();

		return category_data;
	}

	// 메인 카테고리 생성
	async createCategory(category_dto: Category_dto): Promise<Category> {
		const { category_name } = category_dto;

		const mainCategory = this.categoryRepository.create();
		mainCategory.category_name = category_name;
		await this.categoryRepository.save(mainCategory);

		return mainCategory;
	}
	// 메인 카테고리 가져오기
	async getMainCategory(category_dto: Category_dto): Promise<Category> {
		const { category_name } = category_dto;
		const mainCategory_s = await this.categoryRepository.findOne({
			where: {
				category_name,
			},
		});
		return mainCategory_s;
	}

	// 메인 카테고리 삭제
	async deleteMainCategory(category_dto: Category_dto): Promise<void> {
		const { category_name } = category_dto;
		const categoryExsist = await this.categoryRepository.findOne({
			where: {
				category_name,
			},
		});

		if (categoryExsist) {
			await this.categoryRepository.delete({
				category_name,
			});
		}
	}

	// 서브 카테고리 생성
	async createSubCategory(subCategory_dto: SubCategory_dto): Promise<SubCategory> {
		const { category_name, main_category } = subCategory_dto;

		const mainCategory_name = await this.categoryRepository.findOne({
			where: {
				category_name: main_category,
			},
		});

		if (mainCategory_name) {
			const subCategory = this.subCategoryRepository.create({
				category_name,
				mainCategory: mainCategory_name,
			});

			await this.subCategoryRepository.save(subCategory);

			return subCategory;
		}
	}

	// 서브 카테고리 삭제
	async deleteSubCategory(subCategory_dto: SubCategory_dto): Promise<void> {
		const { category_name, main_category } = subCategory_dto;

		const mainCategory_name = await this.categoryRepository.findOne({
			where: {
				category_name: main_category,
			},
		});
		if (mainCategory_name) {
			await this.subCategoryRepository.delete({
				category_name,
			})
		}
	}
}