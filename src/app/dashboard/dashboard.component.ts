import {Component, OnInit} from '@angular/core';
import {CategoryListItemComponent} from "../category/category-list-item/category-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardHeader, MatCardModule, MatCardTitleGroup} from "@angular/material/card";
import {CategoryService} from "../shared/category.service";
import {ChecklistService} from "../shared/checklist.service";
import {Category} from "../shared/category";
import {ChecklistItem} from "../shared/checklistItem";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CategoryListItemComponent,
    NgForOf,
    NgIf,
    MatCardModule,
    MatCardTitleGroup,
    MatCardHeader,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  items: any = []
  categories: Category[] = []
  checklistItems: ChecklistItem[] = []
  progress: number = 0

  constructor(private categoryService: CategoryService,
              private checklistService: ChecklistService)
  {
    this.loadCategories()
    this.loadProgress()
  }

  ngOnInit() {
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: value => {
        this.categories = value
        this.loadChecklistItems()
      }
    })
  }

  loadChecklistItems() {
    this.checklistService.getAll().subscribe({
      next: value => {
        this.checklistItems = value
        this.mountCardItems()
      }
    })
  }

  mountCardItems() {

    for (let category of this.categories) {
      // @ts-ignore
      let listCheckItemFiltred = this.checklistItems.filter(item => item.category === category.guid && !item.isCompleted && new Date(item.deadline).getTime() < new Date().getTime())

      let itemCard = {
        categoryName: category.name,
        amountItemLate: listCheckItemFiltred.length
      }

      this.items.push(itemCard)
    }

    this.items.sort((a: any, b: any) => a.categoryName.localeCompare(b.categoryName))
  }

  private loadProgress() {
    this.checklistService.getProgress().subscribe(value => {
      this.progress = value
    })
  }
}
