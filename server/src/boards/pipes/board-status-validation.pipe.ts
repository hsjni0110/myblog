import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../board-status-enum';

export class BoardStatusValidationPipe implements PipeTransform {
	readonly StatusOptions = [
		BoardStatus.PUBLIC,
		BoardStatus.PRIVATE,
	]
	
	transform(value: any, metadata: ArgumentMetadata){
		
		value = value.toUpperCase();
		
		if(!this.isStatusValid(value)) {
			throw new BadRequestException(`${value} isn't in the status`);
		}
		
		return value;
	}
	
	// option안에 있는 놈인지 체크
	private isStatusValid(status: any) {
		const index = this.StatusOptions.indexOf(status);
		
		return index !== -1
	}
}