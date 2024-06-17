// import { Component, Input, OnInit } from '@angular/core';
// import { Title } from '@angular/platform-browser';
// import { Product } from 'src/app/features/products/models/product';
// import { SharedService } from 'src/app/shared/services/shared.service';
// import Swiper, { Autoplay, Controller, FreeMode, Keyboard, Scrollbar, Zoom } from 'swiper';
// import SwiperCore, { Navigation, Pagination, Virtual } from 'swiper';

// SwiperCore.use([
//   Pagination, Navigation, Virtual, Scrollbar, FreeMode, Keyboard, Autoplay, Controller,
//   Zoom,
// ]);

// @Component({
//   selector: 'app-slider',
//   templateUrl: './slider.component.html',
//   styleUrls: ['./slider.component.scss']
// })
// export class SliderComponent implements OnInit {
//   @Input() products!: Product[];
//   @Input() loading?: boolean;
//   @Input() showSlides?: boolean;
//   @Input() playInterval = 3000;
//   products2: Product[] = [];

//   appTitle = '';

//   config = {
//     pagination: {clickable: true}, navigation: true, slidesPerView: 2, spaceBetween: 10,
//     loop: true, autoplay: { delay: this.playInterval, disableOnInteraction: false},
//     scrollbar: true, class: 'swiper',
//   };

//   images: string[] = [
//     'assets/images/p1.jpg', 'assets/images/p2.jpg', 'assets/images/p3.jpg', 'assets/images/p4.jpg',
//     'assets/images/p5.jpg', 'assets/images/p6.jpg', 'assets/images/51eg55uWmdL._AC_UX679_.jpg',
//     'assets/images/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', 'assets/images/61pHAEJ4NML._AC_UX679_.jpg',
//     'assets/images/71HblAHs5xL._AC_UY879_-2.jpg', 'assets/images/71z3kpMAYsL._AC_UY879_.jpg',
//     'assets/images/81XH0e8fefL._AC_UY879_.jpg',
//   ];

//   constructor(
//     private titleService: Title,
//     private sharedService: SharedService,
//   ) {
//    }
 
//   ngOnInit() {
//     this.appTitle = this.sharedService.appTitle;
//     this.titleService.setTitle(`Slide Products - ${this.appTitle}`);
//     this.loadImage();
//   }

//   loadImage(): void {
//     for (let product of this.products) {
//       if(product.image) this.products2.push(product);
//     }
//   }
// }
