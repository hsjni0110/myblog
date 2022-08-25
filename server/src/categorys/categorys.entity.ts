import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from '../boards/boards.entity';
import { SubCategory } from './subCategory.entity';

@Entity()
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	category_name: string;
	
	@OneToMany(type => SubCategory, subCategory => subCategory.mainCategory,  { eager: true })
	subCategorys: SubCategory[];
}
