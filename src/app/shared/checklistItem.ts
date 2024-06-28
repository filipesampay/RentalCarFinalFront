import {Category} from "./category";

export class ChecklistItem {
  guid!: string;
  description!: string;
  isCompleted!: boolean;
  deadline!: Date;
  postDate!: Date;
  category!: Category;
}
