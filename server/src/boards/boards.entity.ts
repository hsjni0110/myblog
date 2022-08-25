import { BoardStatus } from './board-status-enum';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../categorys/categorys.entity';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	title: string;
	
	@Column()
	description: string;
	
	@Column()
	status: BoardStatus;
	
	@Column()
	mainCategory: string;
	
	@Column()
	subCategory:string;
	
	@ManyToOne(type=> User, user => user.boards, { eager: false })
	user: User;
}