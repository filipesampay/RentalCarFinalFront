import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../shared/category";
import {CategoryService} from "../../shared/category.service";
import {MessageService} from "../../core/dialog-message/message.service";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-category-list-item',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './category-list-item.component.html',
  styleUrl: './category-list-item.component.scss'
})
export class CategoryListItemComponent {
  @Input()
  category!: Category;
  @Output()
  itemChange: EventEmitter<Category> = new EventEmitter<Category>();
  @Output()
  deleteClick: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(public service: CategoryService,
              public messageService: MessageService) { }


  delete(category: Category) {
    this.deleteClick.emit(category);
  }
}
