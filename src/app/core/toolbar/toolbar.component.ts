import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatButton
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  routerDashboard: string = ''
  routerCategory: string = '/category';
  routerChecklist: string = '/checklist';
}
