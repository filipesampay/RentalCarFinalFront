import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ChecklistService} from "../../shared/checklist.service";
import {Category} from "../../shared/category";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {CategoryService} from "../../shared/category.service";
import {MatIcon} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MessageService} from "../../core/dialog-message/message.service";
import {ChecklistItem} from "../../shared/checklistItem";

@Component({
  selector: 'app-checklist-item-form',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatRadioButton,
    MatRadioGroup,
    NgForOf,
    MatSelect,
    MatOption,
    MatIcon,
    MatDatepickerModule
  ],
  templateUrl: './checklist-item-form.component.html',
  styleUrl: './checklist-item-form.component.scss'
})
export class ChecklistItemFormComponent implements OnInit {
  title = 'Novo Item'
  feedbackError!: boolean
  feedbackMessage!: string
  form!: FormGroup
  categories: Category[] = []

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private service: ChecklistService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              private messageService: MessageService)
  {
    this.mountForm()
    this.categoryService.getAll().subscribe(value => {this.categories = value})
  }

  mountForm() {
    this.form = this.formBuilder.group({
      guid: [''],
      description: ['', Validators.required],
      isCompleted: [false, Validators.required],
      deadline: ['', Validators.required],
      category: ['', Validators.required],
      postedDate: ['']
    })
  }

  ngOnInit() {
    const guid = this.activateRoute.snapshot.paramMap.get('guid');
    if (guid) {
      this.service.getByGuid(guid).subscribe({
        next: (value) => {
          if (value) {
            this.form.patchValue(value)
            this.form.controls['category'].patchValue(value.category.guid)
            this.form.controls['postedDate'].disable()
            this.title = 'Alterando Item'
          }
        },
        error: error => {
          console.log(error)
          this.messageService.openDialogError("Erro ao buscar os dados desse item!")
        }
      })
    } else {
      this.form.controls['postedDate'].patchValue(new Date())
      this.form.controls['postedDate'].disable()
    }

  }

  onSubmit() {
    let checklistItem = this.prepareToSave();

    this.service.save(checklistItem).subscribe({
      next: value => {
        this.showMessage("Item salvo com sucesso!", false)
        this.router.navigate(['checklist']);
      },
      error: error => {
        this.showMessage("Erro ao salvar:\n " + error.error.message, true)
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

  private prepareToSave() {
    let checklistItem = this.form.value;
    checklistItem.postedDate = new Date(this.form.controls['postedDate'].value).toISOString();
    checklistItem.deadline = new Date(this.form.controls['deadline'].value).toISOString();
    return checklistItem;
  }
}
