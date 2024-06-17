// import { Component, ViewChild, OnDestroy, OnInit, HostListener, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
// import { Observable, Subscription, map } from 'rxjs';
// import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

// import { Title } from '@angular/platform-browser';
// // import { Product } from 'src/app/models/product';
// // import { CartService } from 'src/app/shared/services/cart.service';
// // import { ProductService } from 'src/app/shared/services/product.service';
// import { SharedService } from 'src/app/shared/services/shared.service';

// import { ROW_HEIGHT } from '../../../../models/types';
// import { MessageDialogService } from 'src/app/shared/dialogs/message-dialog/message-dialog.service';
// import { ProductService } from '../../services/product.service';
// import { CartService } from 'src/app/features/cart/services/cart.service';
// import { Product } from '../../models/product';

// @Component({
//   selector: 'app-product-box',
//   templateUrl: './product-box.component.html',
//   styleUrls: ['./product-box.component.scss']
// })
// export class ProductBoxComponent implements OnInit, OnChanges, OnDestroy {
//   @Input() productsList!: Product[];
//   @Input() productsSearch!: Product[];
//   products!: Product[];

//   @Input() showSlides!: boolean;
//   @ViewChild(MatDrawer) drawer!: MatDrawer;
//   drawerMode = false;
//   fullWidthMode = false;

//   cols = 2;
//   rowHeight = ROW_HEIGHT[this.cols];
//   @Input() category?: string;

//   totalProducts = 20;
//   itemsPerPage = 20;
//   rating = 0;
//   order = 'lowest';
//   minValue = 0;
//   maxValue = 2000;
//   appTitle = '';

//   loading = true;
//   error = false;
//   playInterval = 3000;
//   changes!: SimpleChanges;

//   /** This variable contain subscription from service that would be removed when the component is destroyed to avoid memory leaks */
//   cartSubscription: Subscription = Subscription.EMPTY;
//   private subscriptions: Subscription[] = [];

//   constructor(
//     private productService: ProductService,
//     private messageDialogService: MessageDialogService,
//     private cartService: CartService,
//     private titleService: Title,
//     private sharedService: SharedService,
//   ) {
//   }

//   ngOnInit() {
//     this.appTitle = this.sharedService.appTitle;
//     this.titleService.setTitle(`Product Box - ${this.appTitle}`);
//   }

//   onAddToCart(product: Product) {
//     let message;
//     const { _id, image, name, slug, price } = product;
//     const item = { _id, image, name, slug, price, quantity: 1 };
//     this.cartSubscription = this.cartService.addItem(item).subscribe({
//       next: (productName) => {
//         message = `Item added to the cart:   ${productName}`;
//         this.messageDialogService.openMessageDlg({ message: message, type: 'success' });
//       },
//       error: (err: any) => {
//         message = `${err.message} \n Product Not added`;
//         this.messageDialogService.openMessageDlg({ message: message, type: 'error' });
//       },

//     });
//     this.subscriptions.push(this.cartSubscription);
//   }

//   /**
//    * Updates page layout
//    * @param colsCount is the number of columns to display the product list per row
//    */
//   onColumnsCountUpdate(colsCount: number): void {
//     this.cols = colsCount;
//     this.rowHeight = ROW_HEIGHT[this.cols];
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes.productsSearch || changes.productsList) {
//       this.products = changes.productsSearch?.currentValue || changes.productsList?.currentValue;
//       this.totalProducts = this.productsSearch?.length || this.productsList?.length;
//     }  
//   }

//   ngOnDestroy(): void {
//     this.subscriptions.forEach(subscription => subscription.unsubscribe());
//   }

// }
