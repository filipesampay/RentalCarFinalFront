import {Component, OnInit} from '@angular/core';
import {CategoryListItemComponent} from "../category/category-list-item/category-list-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardHeader, MatCardModule, MatCardTitleGroup} from "@angular/material/card";
import {CategoryService} from "../shared/category.service";
import {ChecklistService} from "../shared/checklist.service";
import {Category} from "../shared/category";
import {ChecklistItem} from "../shared/checklistItem";
import {Card} from "../shared/Card";

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
  items: Card[] = []
  progress: number = 0

  constructor(private categoryService: CategoryService,
              private checklistService: ChecklistService)
  {
    this.loadCards()
    this.loadProgress()
  }

  ngOnInit() {
  }

  loadCards() {
    this.categoryService.getAmountLateByCategory().subscribe({
      next: value => {
        this.items = value
        this.items.sort((a: any, b: any) => a.categoryName.localeCompare(b.categoryName))
      }
    })
  }

  private loadProgress() {
    this.checklistService.getProgress().subscribe(value => {
      this.progress = value
    })
  }
}
