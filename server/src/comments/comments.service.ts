import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { Comment } from './comments.entity';
import * as bcrypt from 'bcryptjs';
import { BoardRepository } from '../boards/boards.repository';
import { CommentDto } from './dto/comment.dto';
import { DeleteDto } from './dto/deleteDto';

@Injectable()
export class CommentsService {
	constructor(
		private commentRepository: CommentRepository,
		private boardRepository: BoardRepository
	) {}

	async postComment(commentDto: CommentDto, posting_id: number): Promise<Comment> {
		const { name, password, contents } = commentDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const commentedBoard = await this.boardRepository.findOne({
			where: {
				id: posting_id,
			},
		});

		const comment = await this.commentRepository.create({
			name,
			contents,
			password: hashedPassword,
			board: commentedBoard,
		});

		await this.commentRepository.save(comment);

		return comment;
	}

	async getComments(posting_id: number): Promise<Comment[]> {
		const comments = await this.commentRepository
			.createQueryBuilder('comment')
			.leftJoinAndSelect('comment.board', 'board')
			.where('board.id = :id', { id: posting_id })
			.getMany();

		return comments;
	}

	async deleteComment(
		deleteDto: DeleteDto,
		posting_id: number,
		comment_id: number
	): Promise<void> {
		const { name, password } = deleteDto;

		const DeleteComment = await this.commentRepository
			.createQueryBuilder('comment')
			.leftJoinAndSelect('comment.board', 'board')
			.where('board.id = :posting_id', { posting_id })
			.andWhere('comment.id = :comment_id', { comment_id })
			.andWhere('name = :name', { name })
			.getOne();

		if (DeleteComment && (await bcrypt.compare(password, DeleteComment.password))) {
			await this.commentRepository
				.createQueryBuilder('comment')
				.leftJoinAndSelect('comment.board', 'board')
				.delete()
				.where('board.id = :posting_id', { posting_id })
				.andWhere('comment.id = :comment_id', { comment_id })
				.andWhere('name = :name', { name: name })
				.execute();
		}
	}
	async patchComment(
		commentDto: CommentDto,
		posting_id: number,
		comment_id: number
	): Promise<void> {
		const { name, password, contents } = commentDto;

		const UpdateComment = await this.commentRepository
			.createQueryBuilder('comment')
			.leftJoinAndSelect('comment.board', 'board')
			.where('board.id = :posting_id', { posting_id })
			.andWhere('comment.id = :comment_id', { comment_id })
			.andWhere('name = :name', { name })
			.getOne();

		if (UpdateComment && (await bcrypt.compare(password, UpdateComment.password))) {
			await this.commentRepository.update(comment_id, {
				contents
			});
		}
	}
}