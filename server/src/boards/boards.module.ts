import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardRepository } from './boards.repository';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { CategorysModule } from '../categorys/categorys.module';
import { CategoryRepository } from '../categorys/categorys.repository';

@Module({
	imports: [
		TypeOrmExModule.forCustomRepository([BoardRepository, CategoryRepository]),
		AuthModule,
		CategorysModule,
	],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}