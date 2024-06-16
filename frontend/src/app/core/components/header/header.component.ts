import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { UserInfo } from 'src/app/features/auth/models';
// import { ProductService } from 'src/app/features/products/services/product.service';
import { SharedService } from 'src/app/shared/services/shared.service';
// import { ForgotPasswordComponent } from 'src/app/features/auth/dialogs/forgot-password/forgot-password.component';
// import { AuthService } from 'src/app/features/auth/helpers/auth.service';
// import { CartService } from 'src/app/features/cart/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav!: MatSidenav;
  @Input() isLargeScreen!: boolean;
  categories: [] = [];
  searchForm: FormGroup;
  appName = '';
  itemsCount: number = 0;
  // currentUser: UserInfo | null = null;
  authSubscription: Subscription = Subscription.EMPTY;
  cartSubscription: Subscription = Subscription.EMPTY;
  productsSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private titleService: Title,
    private sharedService: SharedService,
    private router: Router,
    // private cartService: CartService,
    // private authService: AuthService,
    // private productService: ProductService
  ) {
    this.searchForm = this.formBuilder.group({
      query: [''],
    });
  }
  ngOnInit() {
    // this.appName = this.sharedService.appTitle;
    // this.titleService.setTitle(`Core Header - ${this.sharedService.appTitle}`);
    // this.authSubscription = this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    // this.subscriptions.push(this.authSubscription);
    // this.cartSubscription = this.cartService.currentCart.subscribe((x) => (this.itemsCount = x.itemsCount));
    // this.subscriptions.push(this.cartSubscription);
    // this.productsSubscription = this.productService.getCategories().subscribe((categories) => (this.categories = categories));
    // this.subscriptions.push(this.productsSubscription);
    // localStorage.setItem('allCategories', JSON.stringify(this.categories));
  }

  onSubmit() {
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.searchForm.controls.query.value
      },
    });
  }
  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    // this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
