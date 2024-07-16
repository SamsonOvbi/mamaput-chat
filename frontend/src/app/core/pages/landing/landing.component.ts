import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  public loggedIn: boolean = false;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router, 
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.checkLogin();

    this.authSubscription = this.authService.isLoggedIn.subscribe((val) => {
      this.loggedIn = val;
    });
    this.subscriptions.push(this.authSubscription);
  }
  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
