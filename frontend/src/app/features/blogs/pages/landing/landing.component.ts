import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.checkLogin();

    this.authService.isLoggedIn.subscribe((val) => {
      this.loggedIn = val;
    });
  }
  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
