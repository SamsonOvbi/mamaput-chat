import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../dialog-data.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  onEmitStatusChange = new EventEmitter<MouseEvent>();

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: ConfirmDialogData ) {}

  ngOnInit(): void { 
    if (this.dialogData) {
      this.dialogData = this.dialogData;
    }
  }

  handleChangeAction(statusChange: MouseEvent) {
    console.log('Button clicked', statusChange);
    this.onEmitStatusChange.emit(statusChange);
  }
}
