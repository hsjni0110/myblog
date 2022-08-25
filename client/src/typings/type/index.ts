export interface Board {
	id?: number;
	title?: string;
	description?: string;
	status?: BoardStatus;
	mainCategory?: string;
	subCategory?: string;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

export interface Category_data {
	id: number;
	category_name: string;
	subCategorys: Subcategory[]
}

export interface Subcategory {
	id: number;
	category_name: string;
}