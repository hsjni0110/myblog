export interface Board {
	id?: number;
	title?: string;
	description?: string;
	status?: BoardStatus;
	mainCategory?: string;
	subCategory?: string;
	comments: CommentType[];
	ThumnailUrl: string;
}
export interface CommentType {
	contents: string;
	createdAt: string;
	deletedAt: any;
	id: number;
	name: string;
	password: string;
	updatedAt: string;
}

export enum BoardStatus {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export interface Category_data {
	id: number;
	category_name: string;
	subCategorys: Subcategory[];
}

export interface Subcategory {
	id: number;
	category_name: string;
}