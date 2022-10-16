import { BoardStatus } from './board-status-enum';
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../categorys/categorys.entity';
import { Comment } from '../comments/comments.entity';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ type: 'text' })
	description: string;

	@Column()
	status: BoardStatus;

	@Column()
	mainCategory: string;

	@Column()
	subCategory: string;

	@UpdateDateColumn({ name: 'update_at', comment: '수정일' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
	deletedAt?: Date | null;

	@ManyToOne((type) => User, (user) => user.boards, { eager: false })
	user: User;
	
	@OneToMany((type) => Comment, (comment) => comment.board, { eager: true })
	comments: Comment[]
	
	@Column()
	ThumnailUrl: string;
}