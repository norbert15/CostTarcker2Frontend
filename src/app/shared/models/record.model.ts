import { CategoryType } from "./category.model";

export interface RecordType {
    id?: number;
    categoryId: number;
    value: number;
    month: string;
    comment: string;
    created?: string;
}

export interface RecorsdWithCategoryType {
    category: CategoryType,
    records: RecordType[]
    sum: number;
}