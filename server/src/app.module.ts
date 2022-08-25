import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CategorysModule } from './categorys/categorys.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule, CategorysModule],
})
export class AppModule {}