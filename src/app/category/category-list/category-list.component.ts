import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {CategoryListItemComponent} from "../category-list-item/category-list-item.component";
import {Category} from "../../shared/category";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryService} from "../../shared/category.service";
import {MatIcon} from "@angular/material/icon";
import {ChecklistListItemComponent} from "../../checklist/checklist-list-item/checklist-list-item.component";
import {MessageService} from "../../core/dialog-message/message.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    CategoryListItemComponent,
    NgIf,
    MatIcon,
    NgForOf,
    MatLabel,
    ChecklistListItemComponent,
    MatFormField,
    MatInput
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  categories: Category[] = [];

  constructor(private service: CategoryService,
              private messageService: MessageService)
  {
    this.reload();
  }

  reload() {
    this.categories = [];
    this.service.getAll().subscribe(categories => {
      this.categories = categories;
      this.categories.sort((a, b) => a.name.localeCompare(b.name))
    });
  }

  refresh(categoryRefresh: Category) {
    const categoryIndex = this.categories.findIndex( (category) => category.guid == categoryRefresh.guid);
    this.categories.splice(categoryIndex, 1);
  }

  delete(category: Category) {
    this.messageService.openDialogConfirm("Confirmar exclusão ?").afterClosed().subscribe(value => {
      if (value == true) {
        this.executeDelete(category)
      }
    });
  }

  private executeDelete(category: Category) {
    this.service.delete(category.guid).subscribe({
      next: data => {
        this.refresh(data);
        this.messageService.openDialogSuccess("Excluído com sucesso!")
      },
      error: error => {
        console.log(error)
        this.messageService.openDialogError(`Erro ao excluir:\n ${error.error.message}`)
      }
    });
  }
}
