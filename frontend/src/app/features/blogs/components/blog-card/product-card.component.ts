// import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
// import { Product } from 'src/app/features/products/models/product';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { ROW_HEIGHT } from 'src/app/models/types';
// import { PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-product-card',
//   templateUrl: './product-card.component.html',
//   styleUrls: ['./product-card.component.scss']
// })
// export class ProductCardComponent implements OnInit {
//   @Input() products!: Product[];
//   @Input() showSlides = true;
//   @Input() fullWidthMode = false;
//   @Input() cols = 2;
//   @Input() rowHeight = ROW_HEIGHT[this.cols];

//   //Pass event to parent component
//   @Output() addToCart = new EventEmitter<Product>();
//   @Input() loading?: boolean;
//   @Input() error?: boolean;

//   currentPage = 1;
//   itemsPerPage = 20;
//   @Input() totalProducts!: number; // This should ideally be calculated based on the products array

//   constructor(
//     private titleService: Title,
//     private sharedService: SharedService
//   ) {
//   }

//   ngOnInit(): void {
//     // this.totalProducts = this.products.length;
//     this.titleService.setTitle(`Product Card - ${this.sharedService.appTitle}`);
//   }

//   get paginatedProducts() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.products.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   handlePageEvent(event: PageEvent) {
//     this.currentPage = event.pageIndex + 1;
//     this.itemsPerPage = event.pageSize;
//   }
//   trackByProductId(index: any, product: any) {
//     return product.id;
//   }

//   /** Emits the product gotten from the cart */
//   onAddToCart(product: Product): void {
//     this.addToCart.emit(product);
//   }

// }
