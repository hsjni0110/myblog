import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './categorys.entity';

@Entity()
export class SubCategory extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	category_name: string;
	
	@ManyToOne(type => Category, category => category.subCategorys, { eager: false })
	mainCategory: Category;
}
