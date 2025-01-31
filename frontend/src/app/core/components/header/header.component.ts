import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../features/auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from 'src/app/features/users/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public loggedIn: boolean = false;
  public drop: boolean = false;
  public routerOutlet: boolean = true;
  public profileImage: string = '';
  public userName: string = '';
  public appTitle = '';
  sharedSubscription: Subscription = Subscription.EMPTY;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private rendere: Renderer2,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService,
  ) { }
  alertOpt: SweetAlertOptions = {};
  color: string = '';

  ngOnInit(): void {
    this.appTitle = this.sharedService.appTitle;
    this.sharedService.setRouterOutlet(this.route.url);
    this.sharedSubscription = this.sharedService.showNavar.subscribe((val) => { this.routerOutlet = val; });
    this.subscriptions.push(this.sharedSubscription);
    this.alertOpt = { title: 'Success!', text: 'Saved successfuly', toast: false, allowOutsideClick: false, };
    this.authService.checkLogin();

    this.isLoggedInFn();
  }

  isLoggedInFn(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe((val) => {
      this.loggedIn = val;
      if (this.loggedIn) {
        this.userService.getProfile().subscribe({
          next: (res: any) => {
            this.profileImage = res.data.image;
            this.userName = res.data.username;
          },
          error: (error: any) => {
            console.log('error', error);
          }
        });
      }
    });
    this.subscriptions.push(this.authSubscription);
    this.sharedSubscription = this.sharedService.profileImageUrl.subscribe((res) => {
      this.profileImage = res;
    });
    this.subscriptions.push(this.sharedSubscription);
  }

  ngAfterViewInit() {
    const hamburger = this.elementRef.nativeElement.querySelector('.hamburger');
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    navMenu.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  profileDrop() {
    this.drop = !this.drop;
  }

  logout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
