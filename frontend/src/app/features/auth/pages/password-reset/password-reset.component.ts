import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, } from '@angular/router';
import { ResetPasswordDialogComponent } from 'src/app/features/dialogs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  newPasswordHide: boolean = true;
  confirmPasswordHide: boolean = true;
  token: any;
  constructor(
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  savePassword(): void {
    // this.dialogRef.close(this.changePassword.value);
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    const dialogOptions = { width: '50%', height: 'auto', backdropClass: 'bgClass', data: { token: this.token }, }
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('closed password dialog', result);
      result ? this.router.navigate(['/auth/login']) : this.router.navigate(['/landing']);
    });
  }
}
