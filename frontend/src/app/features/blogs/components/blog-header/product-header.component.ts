// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';

// @Component({
//   selector: 'app-product-header',
//   templateUrl: './product-header.component.html'
// })
// export class ProductHeaderComponent {
//   @Input() drawer: any;
//   @Input() category?: string;
//   @Input() totalProducts: any;

//   @Output() columnsCountChange = new EventEmitter<number>();

//   pageSize = 20;
//   pageSizeChoose = [5, 10, 20, 50];

//   constructor(
//     private titleService: Title,
//     private sharedService: SharedService
//   ) {
//     this.titleService.setTitle(`Product Header - ${this.sharedService.appTitle}`);
//   }

//   onColumnsUpdated(colsNum: number): void {
//     this.columnsCountChange.emit(colsNum);
//   }

// }
