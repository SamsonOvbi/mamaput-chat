import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  apiUrl = environment.apiUrl;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signUpForm = this._fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void { }
  signup() {
    // console.log('this.signUpForm', this.signUpForm.value);
    if (this.signUpForm.valid) {
      this.authSubscription = this.http.post(`${this.apiUrl}/auth/signup`, this.signUpForm.value).subscribe({
        next: (res: any) => {
          this.router.navigate(['/auth/login']);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Toast.fire({ icon: 'success', title: 'Sigup successfully', });
          // console.log('res...', res);
          localStorage.setItem('token', res.token);
        },
        error: (err: any) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: `${err.message} Please try again!!`, });
          // console.log('err.message', error.message);
        }
      });
      this.subscriptions.push(this.authSubscription);
    }
  }

  get username() {
    return this.signUpForm.controls['username'];
  }

  get email() {
    return this.signUpForm.controls['email'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
