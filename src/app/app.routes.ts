import { Routes } from '@angular/router';
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {CategoryFormComponent} from "./category/category-form/category-form.component";
import {ChecklistListComponent} from "./checklist/checklist-list/checklist-list.component";
import {ChecklistItemFormComponent} from "./checklist/checklist-item-form/checklist-item-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'checklist', component: ChecklistListComponent},
  {path: 'checklist/new', component: ChecklistItemFormComponent},
  {path: 'checklist/edit/:guid', component: ChecklistItemFormComponent},
  {path: 'category', component: CategoryListComponent},
  {path: 'category/new', component: CategoryFormComponent},
  {path: 'category/edit/:guid', component: CategoryFormComponent},
];
