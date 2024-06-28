import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {ChecklistItem} from "../../shared/checklistItem";
import {MessageService} from "../../core/dialog-message/message.service";
import {ChecklistService} from "../../shared/checklist.service";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-checklist-list-item',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatButton,
    DatePipe,
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './checklist-list-item.component.html',
  styleUrl: './checklist-list-item.component.scss'
})
export class ChecklistListItemComponent {
  @Input()
  checklistItem!: ChecklistItem
  @Output()
  deleteClick: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>()
  @Output()
  itemChange: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();

  constructor(public service: ChecklistService,
              public messageService: MessageService) {
  }

  delete(checklistItem: ChecklistItem) {
    this.deleteClick.emit(checklistItem)
  }

  eventCheck(event: any) {
    this.checklistItem.isCompleted = event.checked

    // @ts-ignore
    this.checklistItem.category = this.checklistItem.category.guid

    this.service.save(this.checklistItem).subscribe({
      next: value => {
        this.checklistItem = value;

        if (value.isCompleted)
          this.showMessage("Item completado com sucesso!", false)
        else
          this.showMessage("Item descompletado com sucesso!", false)

        this.itemChange.emit(this.checklistItem);
      },
      error: error => {
        console.log(error)
        this.checklistItem.isCompleted = !event.checked;
        this.showMessage("Erro ao completar item!", true)
      }
    })
  }

  private showMessage(message: string, isError: boolean) {
    if (isError) {
      this.messageService.openDialogError(message)
    } else {
      this.messageService.openDialogSuccess(message)
    }
  }
}
