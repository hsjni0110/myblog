import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany} from 'typeorm';
import { Board } from '../boards/boards.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
	
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	username: string;
	
	@Column()
	password: string;
	
	@OneToMany(type => Board, board => board.user, { eager: true })
	boards: Board[]
}