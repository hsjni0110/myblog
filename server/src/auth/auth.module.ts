import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy:'jwt'
		}),
		JwtModule.register({
			secret:'Secret',
			signOptions:{
				expiresIn: 3600
			}
		}),
		TypeOrmExModule.forCustomRepository([UserRepository])],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}