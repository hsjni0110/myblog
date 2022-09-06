import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status-enum';
import { Board } from './boards.entity';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Category } from '../categorys/categorys.entity';
import { BoardWithCategory } from './dto/board_with_category';

@Injectable()
export class BoardsService {
	  constructor(
        private boardRepository: BoardRepository,
    ) { }

	async getAllBoard(): Promise<Board[]> {
		const query = this.boardRepository.createQueryBuilder('board')
		
		const boards = query.getMany();
		
		return boards;
	}
	
	// 게시글 생성
	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		const { title, description, mainCategory, subCategory } = createBoardDto;
		
		const board = await this.boardRepository.create({
			title,
			description,
			status: BoardStatus.PUBLIC,
			user,
			mainCategory,
			subCategory,
		});

		await this.boardRepository.save(board);
		return board;
	}

	// id로 게시물 가져오기
	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOne({ where: { id: id } });

		if (!found) {
			throw new NotFoundException();
		}
		return found;
	}

	// id로 게시글 삭제하기
	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete(id);
		

		if (result.affected === 0) {
			throw new NotFoundException(`can't find Board id with ${id}`);
		}
	}

	// 게시글 업데이트 기능
	async updateBoardStatus(id: number, status: BoardStatus) {
		const board = await this.getBoardById(id);
		board.status = status;
		return board;
	}
	
	// 게시글 수정 기능
	async patchBoard(id: number, createBoardDto: CreateBoardDto) : Promise<void> {
		
		const { title, description, mainCategory, subCategory } = createBoardDto;
		
		await this.boardRepository.update(id, {
			title,
			description,
			mainCategory,
			subCategory
		});

	}
	// 카테고리 별 데이터 가져오기
	async getDataByCategory(boardWithCategory:BoardWithCategory) : Promise<Board[]> {
		
		const { mainCategory, subCategory } = boardWithCategory;
		
		const DataWithCategory = await this.boardRepository.find({
			where:{
				mainCategory,
				subCategory
			}
		});
		
		return DataWithCategory;
		
	}
}