import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';
import { Board } from '../boards/boards.entity';

@Entity()
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'char', length: 50 })
	name: string;

	@Column({ type: 'varchar' })
	contents: string;

	@Column({ type: 'varchar' })
	password: string;

	@CreateDateColumn({ name: 'create_at', comment: '생성일' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'update_at', comment: '수정일' })
	updatedAt: Date;

	@DeleteDateColumn({ name: 'delete_at', comment: '삭제일' })
	deletedAt?: Date | null;

	@ManyToOne((type) => Board, (board) => board.comments, { eager: false })
	board: Board;
}