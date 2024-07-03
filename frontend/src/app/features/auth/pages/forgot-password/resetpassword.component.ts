// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss', '../login/login.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  public resetEmail: any;
  constructor(private authService: AuthService) { }
  ngOnInit(): void { }

  reset() {
    let data = {
      email: this.resetEmail,
    };
    this.authService.forgotPassword(data).subscribe({
      next: (res: any) => {
        Swal.fire({ icon: 'success', title: 'SUCCESS', text: `${res.data}`, });
      },
      error: (error: any) => {
        Swal.fire({ icon: 'error', title: 'Something Went Wrong', text: `${error.message}`, });
      }
  });
    // console.log('resetEmail', data);
  }
}
