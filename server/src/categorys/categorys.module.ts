import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { CategoryRepository } from './categorys.repository';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { SubCategoryRepository } from './subCategory.repository';

@Module({
	imports: [TypeOrmExModule.forCustomRepository([CategoryRepository, SubCategoryRepository]), AuthModule],
	controllers: [CategorysController],
	providers: [CategorysService],
	exports:[CategorysService,TypeOrmExModule],
})
export class CategorysModule {}