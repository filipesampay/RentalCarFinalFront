import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatInput} from "@angular/material/input";
import {CategoryService} from "../../shared/category.service";
import {NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MessageService} from "../../core/dialog-message/message.service";

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButton,
    RouterLink,
    MatInput,
    NgIf,
    MatRadioGroup,
    MatRadioButton
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {
  title = 'Nova categoria'
  feedbackError!: boolean
  feedbackMessage!: string
  form!: FormGroup

  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private service: CategoryService,
              private formBuilder: FormBuilder,
              private messageService: MessageService)
  {
    this.mountForm()
  }

  mountForm() {
    this.form = this.formBuilder.group({
      guid: [''],
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    const guid = this.activateRoute.snapshot.paramMap.get('guid');
    if (guid) {
      this.service.getByGuid(guid).subscribe({
        next: value => {
          if (value) {
            this.form.patchValue(value)
            this.title = 'Alterando categoria'
          }
        },
        error: error => {
          console.log(error)
          this.messageService.openDialogError("Erro ao buscar os dados dessa categoria!")
        }
      })
    }

  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: value => {
        this.showMessage("Categoria salva com sucesso!", false)
        this.router.navigate(['category'])
      },
      error: error => {
        console.log(error)
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
}
