import { Component } from '@angular/core';
import {ChecklistListItemComponent} from "../checklist-list-item/checklist-list-item.component";
import {MatIcon} from "@angular/material/icon";
import {ChecklistItem} from "../../shared/checklistItem";
import {ChecklistService} from "../../shared/checklist.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {CategoryListItemComponent} from "../../category/category-list-item/category-list-item.component";
import {MatButton} from "@angular/material/button";
import {MessageService} from "../../core/dialog-message/message.service";
import {CategoryService} from "../../shared/category.service";
import {Category} from "../../shared/category";

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [
    ChecklistListItemComponent,
    MatIcon,
    NgIf,
    NgForOf,
    CategoryListItemComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss'
})
export class ChecklistListComponent {
  checklistItems: ChecklistItem[] = []
  categories: Category[] = [];

  constructor(private service: ChecklistService,
              private categoryService: CategoryService,
              private messageService: MessageService)
  {
    this.reload();
  }

  reload() {
    this.checklistItems = []
    this.service.getAll().subscribe(checklistItens => {
      this.checklistItems = checklistItens;
      this.sortList(checklistItens);

      this.categoryService.getAll().subscribe(categories => {
        this.categories = categories;

        for (let checklistItem of this.checklistItems) {
          // @ts-ignore
          checklistItem.category = this.categories.find( (category) => category.guid == checklistItem.category)
        }
      });
    });
  }

  refresh(itemRefresh: ChecklistItem) {
    const itemIndex = this.checklistItems.findIndex( (checklistItem) => checklistItem.guid == itemRefresh.guid)
    this.checklistItems.splice(itemIndex, 1)
  }

  delete(checklistItem: ChecklistItem) {
    this.messageService.openDialogConfirm("Confirmar exclusão ?").afterClosed().subscribe(value => {
      if (value == true) {
        this.executeDelete(checklistItem)
      }
    })
  }

  private executeDelete(checklistItem: ChecklistItem) {
    this.service.delete(checklistItem.guid).subscribe({
      next: data => {
        this.refresh(data)
        this.messageService.openDialogSuccess("Excluído com sucesso!!!")
      },
      error: error => {
        console.log(error)
        this.messageService.openDialogError(`Erro ao excluir: \n ${error.error.message}`)
      }
    })
  }

  sortList(checklistItems: ChecklistItem[]) {
    checklistItems.sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return (a.isCompleted ? 1 : 0) - (b.isCompleted ? 1 : 0)
      }
      const dateA = new Date(a.deadline).getTime();
      const dateB = new Date(b.deadline).getTime();
      if (dateA !== dateB) {
        return dateB - dateA;
      }
      return a.description.localeCompare(b.description)
    });
  }

  alterItem(checkItem: ChecklistItem) {
    const index = this.checklistItems.findIndex(checklistItem => checklistItem.guid === checkItem.guid)
    if (index !== -1) {
      this.checklistItems[index] = checkItem
    }
    this.sortList(this.checklistItems)
  }
}
