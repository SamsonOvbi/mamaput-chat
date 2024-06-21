import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog.component';
import { MessageDialogData } from '../dialog-data.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  constructor(private dialog: MatDialog) { }

  openMessageDlg(dialogData: MessageDialogData): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'msgDialog';
    dialogConfig.width = '550px'; 
    dialogConfig.data = dialogData;
    dialogConfig.position = { top: '0px' };
    dialogConfig.panelClass = dialogData.type === 'error' ? 'error-alert' : 'success-alert';

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => dialogRef.close(), 1500); // Auto-close after 2500ms
    });
  }
}