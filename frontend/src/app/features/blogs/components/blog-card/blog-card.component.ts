// import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
// import { Blog } from 'src/app/features/blogs/models/blog';
// import { Title } from '@angular/platform-browser';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import { ROW_HEIGHT } from 'src/app/models/types';
// import { PageEvent } from '@angular/material/paginator';

// @Component({
//   selector: 'app-blog-card',
//   templateUrl: './blog-card.component.html',
//   styleUrls: ['./blog-card.component.scss']
// })
// export class ProductCardComponent implements OnInit {
//   @Input() blogs!: Blog[];
//   @Input() showSlides = true;
//   @Input() fullWidthMode = false;
//   @Input() cols = 2;
//   @Input() rowHeight = ROW_HEIGHT[this.cols];

//   //Pass event to parent component
//   @Output() addToCart = new EventEmitter<Blog>();
//   @Input() loading?: boolean;
//   @Input() error?: boolean;

//   currentPage = 1;
//   itemsPerPage = 20;
//   @Input() totalProducts!: number; // This should ideally be calculated based on the blogs array

//   constructor(
//     private titleService: Title,
//     private sharedService: SharedService
//   ) {
//   }

//   ngOnInit(): void {
//     // this.totalProducts = this.blogs.length;
//     this.titleService.setTitle(`Blog Card - ${this.sharedService.appTitle}`);
//   }

//   get paginatedProducts() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   handlePageEvent(event: PageEvent) {
//     this.currentPage = event.pageIndex + 1;
//     this.itemsPerPage = event.pageSize;
//   }
//   trackByProductId(index: any, blog: any) {
//     return blog.id;
//   }

//   /** Emits the blog gotten from the cart */
//   onAddToCart(blog: Blog): void {
//     this.addToCart.emit(blog);
//   }

// }
