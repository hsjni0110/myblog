import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentRepository } from './comments.repository';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { BoardRepository } from '../boards/boards.repository';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([CommentRepository, BoardRepository]),
	],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export class CommentsModule {}