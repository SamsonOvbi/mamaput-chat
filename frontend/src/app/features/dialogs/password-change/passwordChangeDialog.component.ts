import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'password-change',
  templateUrl: './passwordChangeDialog.component.html',
  styleUrls: ['../dialog.css'],
})
export class PasswordChangeDialogComponent implements OnInit {
  currentPasswordHide: boolean = true;
  newPasswordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  changePassword: FormGroup;
  public error: string = '';
  showError = false;
  authSubscription: Subscription = Subscription.EMPTY;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.changePassword = this._fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  savePassword(): void {
    if (this.changePassword.valid) {
      this.authSubscription = this.authService.updatePassword(this.changePassword.value).subscribe({
        next: (res: any) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Toast.fire({ icon: 'success', title: 'Password Update successfully', });
          this.dialogRef.close(this.changePassword.value);
        },
        error: (error: any) => {
          // console.log('the value of err', error);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Toast.fire({ icon: 'error', title: `${error.message}`, });
          this.dialogRef.close(this.changePassword.value);
        }
    });
    this.subscriptions.push(this.authSubscription);
    }
  }
  get newPassword() {
    return this.changePassword.value['newPassword'];
  }

  get confirmPassword() {
    return this.changePassword.value['confirmPassword'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
