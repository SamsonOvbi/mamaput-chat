import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'reset-password',
  templateUrl: './resetPasswordDialog.component.html',
  styleUrls: ['../dialog.css'],
})
export class ResetPasswordDialogComponent implements OnInit {
  currentPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  changePassword: FormGroup;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private authService: AuthService, private router: Router
  ) {
    dialogRef.disableClose = true;

    this.changePassword = this._fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  savePassword(): void {
    if (this.changePassword.valid) {
      this.authSubscription = this.authService.resetPassword(this.changePassword.value, this.data.token).subscribe({
        next: (res: any) => {
          const Toast = Swal.mixin({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
          });
          Toast.fire({ icon: 'success', title: 'Password Update successfully', });
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          const Toast = Swal.mixin({
            toast: true, position: 'top-end', showConfirmButton: false, timer: 2500, timerProgressBar: true,
          });
          Toast.fire({ icon: 'error', title: `${err.message}`, });
        }
      });
      this.subscriptions.push(this.authSubscription);
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: `Invalid Form`, });
    }
  }

  closeModal() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
