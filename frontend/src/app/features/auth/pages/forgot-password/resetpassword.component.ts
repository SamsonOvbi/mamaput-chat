// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss', '../login/login.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public resetEmail: any;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) { }
  ngOnInit(): void { }

  reset() {
    let data = {
      email: this.resetEmail,
    };
    this.authSubscription = this.authService.forgotPassword(data).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success', title: 'SUCCESS', text: `${res.data}`, });
      },
      error: (error: any) => {
        Swal.fire({ icon: 'error', title: 'Something Went Wrong', text: `${error.message}`, });
      }
    });
    this.subscriptions.push(this.authSubscription);
    // console.log('resetEmail', data);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
