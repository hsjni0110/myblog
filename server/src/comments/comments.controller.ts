import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { DeleteDto } from './dto/deleteDto';

import { Comment } from './comments.entity';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
@Controller('comments')
export class CommentsController {
	constructor(private commentsService: CommentsService) {}

	// 댓글 등록
	@Post('/:posting_id')
	postComment(
		@Body() commentDto: CommentDto,
		@Param('posting_id') posting_id: number
	): Promise<Comment> {
		return this.commentsService.postComment(commentDto, posting_id);
	}
	
	
	// 포스팅 별 댓글 가져오기
	@Get('/:posting_id')
	getComments(@Param('posting_id') posting_id: number):Promise<Comment[]> {
		return this.commentsService.getComments(posting_id);		
	}
	
	
	// 삭제 요청(포스팅 아이디 + 댓글 아이디 필요 + 이름 + 비밀번호 필요)
	@Post('/delete/:posting_id/:comment_id')
	deleteComment(@Body() deleteDto : DeleteDto, @Param('posting_id') posting_id: number, @Param('comment_id') comment_id: number) : Promise<void> {
		return this.commentsService.deleteComment(deleteDto, posting_id, comment_id);
	}
	
	
	// 수정 요청(포스팅 아이디 + 댓글 아이디 필요 + 이름 + 비밀번호 + 바꿀 내용 전송)
	@Patch('/update/:posting_id/:comment_id')
	patchComment(@Body() commentDto : CommentDto, @Param('posting_id') posting_id: number, @Param('comment_id') comment_id: number): Promise<void> {
		return this.commentsService.patchComment(commentDto, posting_id, comment_id);
	}
	
	/* 댓글 인증하기 */
	@Post('/certify/:posting_id/:comment_id')
	certifyComment(@Body() deleteDto : DeleteDto, @Param('posting_id') posting_id:number, @Param('comment_id') comment_id) : Promise<boolean>{
		return this.commentsService.certifyComment(deleteDto, posting_id, comment_id);
	}
	
}