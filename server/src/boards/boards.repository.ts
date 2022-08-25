import { Repository } from "typeorm";
import { Board } from './boards.entity';
import { CreateBoardDto } from '../boards/dto/create-board.dto';
import { BoardStatus } from '../boards/board-status-enum';
import { CustomRepository } from '../db/typeorm-ex.decorator';
@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
	
	
}