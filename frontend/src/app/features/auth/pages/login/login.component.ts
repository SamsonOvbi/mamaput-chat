import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public hide: boolean = true;
  apiUrl = environment.apiUrl;
  alertOpt: SweetAlertOptions = {};
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {
      this.authSubscription = this.http.post(`${this.apiUrl}/auth/login`, this.loginForm.value).subscribe({
        next: (res: any) => {
          const Toast = Swal.mixin({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
          });
          Toast.fire({ icon: 'success', title: 'Signed in successfully', });
          if (res.token) {
            this.authService.setLogIn();
          }
          this.sharedService.setProfileImage(res.imageUrl);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/landing']);
        },
        error: (error: any) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: `${error.message} Please try again!!`, });
        }
      });
      this.subscriptions.push(this.authSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
