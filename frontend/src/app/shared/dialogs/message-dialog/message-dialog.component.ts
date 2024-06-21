import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogData } from '../dialog-data.interface';

@Component({
  selector: 'app-message-dialog',
  template: `
  <div [ngStyle]="{'background-color': backgroundColor}" >
    <h2>{{ dialogData.message }}</h2>
  </div>
  `,
})
export class MessageDialogComponent implements OnInit {
  backgroundColor!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: MessageDialogData,
    private dialogRef: MatDialogRef<MessageDialogComponent>,
  ) { }

  ngOnInit() {
    this.backgroundColor = this.dialogData.type === 'success' ? 'green' : 'red';
    // setTimeout(() => this.dialogRef.close(), 2500);  // Auto-close after 2500ms
  }

}