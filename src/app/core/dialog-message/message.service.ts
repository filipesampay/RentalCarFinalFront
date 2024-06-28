import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogMessageComponent} from "./dialog-message/dialog-message.component";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private dialog: MatDialog) { }

  openDialogSuccess(message: string, height?: string, width?: string) {
    this.dialog.open(DialogMessageComponent, {
      data: {
        message: message,
        isConfirm: false,
        isError: false,
        isSuccess: true,
      },
      height: height ? height : '305px',
      width: width ? width : '390px',
      disableClose: true,
    })
  }

  openDialogError(message: string, height?: string, width?: string) {
    this.dialog.open(DialogMessageComponent, {
      data: {
        message: message,
        isConfirm: false,
        isError: true,
        isSuccess: false,
      },
      height: height ? height : '330px',
      width: width ? width : '400px',
      disableClose: true,
    })
  }

  openDialogConfirm(message: string, height?: string, width?: string) {
    return this.dialog.open(DialogMessageComponent, {
      data: {
        message: message,
        isConfirm: true,
        isError: false,
        isSuccess: false,
      },
      height: height ? height : '330px',
      width: width ? width : '400px',
      disableClose: true,
    })
  }
}
