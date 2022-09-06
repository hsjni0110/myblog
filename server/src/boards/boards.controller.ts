import { Controller, Get, Post, Delete, Patch, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.entity';
import { BoardStatus } from './board-status-enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CategorysService } from '../categorys/categorys.service';
import { BoardWithCategory } from './dto/board_with_category';

@Controller('boards')
export class BoardsController {
	constructor(private boardService: BoardsService,
				private categorysService: CategorysService,
				){ }
	
	// 모든 게시클 요청
	@Get('/')
	getAllBoards() : Promise<Board[]>{
		return this.boardService.getAllBoard();
	}
	
	// 게시글 생성 요청
	@Post()
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
	async createBoard(
		@Body() createBoardDto:CreateBoardDto,
		@GetUser() user: User
	): Promise<Board> {
			return this.boardService.createBoard(createBoardDto, user); 
	}

	// id로 게시글 가져오기 요청
	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardService.getBoardById(id);
	}
	
	// 게시글 삭제 요청
	@Delete('/:id')
	@UseGuards(AuthGuard())
	deleteBoard(@Param('id', ParseIntPipe) id, @GetUser() user: User):Promise<void> {
		return this.boardService.deleteBoard(id, user);
	}
	
	@Patch('/:id/status')
	@UseGuards(AuthGuard())
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus
	) : Promise<Board> {
			return this.boardService.updateBoardStatus(id,status);
	}
	
	// 게시글 수정 요청
	@Patch('/:id')
	@UseGuards(AuthGuard())
	patchBoard(
		@Param('id', ParseIntPipe) id:number, @Body() createBoardDto: CreateBoardDto
	) : Promise<void> {
		return this.boardService.patchBoard(id, createBoardDto);
	}
	
	// 카테고리 별 게시글 가져오기
	@Post('/category')
	getDataByCategory(@Body() boardWithCategory: BoardWithCategory) : Promise<Board[]> {
		return this.boardService.getDataByCategory(boardWithCategory);
	}
}
