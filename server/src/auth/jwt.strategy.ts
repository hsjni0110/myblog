import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private userRepository: UserRepository
	) {
		super({
			secretOrKey:'Secret',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}
	
	async validate(payload) {
		const { username } = payload;
		const user: User = await this.userRepository.findOneBy({ username });
		
		if(!user) {
			throw new UnauthorizedException();
		}
		
		return user;
	}
}