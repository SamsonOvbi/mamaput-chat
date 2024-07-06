import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-write-header',
  templateUrl: './write-header.component.html'
})
export class WriteHeaderComponent {
  @Input() drawer: any;
  @Input() category?: string;
  // @Input() totalWrites: any;
  @Input() totalItems: any;

  @Output() columnsCountChange = new EventEmitter<number>();

  pageSize = 20;
  pageSizeChoose = [5, 10, 20, 50];

  constructor(
  ) {  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
