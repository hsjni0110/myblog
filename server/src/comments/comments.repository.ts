import { Repository } from "typeorm";
import { CustomRepository } from '../db/typeorm-ex.decorator';
import { Comment } from './comments.entity';

@CustomRepository(Comment)
	export class CommentRepository extends Repository<Comment> {

	
}