import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../../shared/material.module';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailChangeDialogComponent } from './email-change-dialog/emailChangeDialog.component';
import { PasswordChangeDialogComponent } from './password-change/passwordChangeDialog.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/resetPasswordDialog.component';

const componentsList = [
  PasswordChangeDialogComponent, EmailChangeDialogComponent, 
  ResetPasswordDialogComponent,
];
const modulesList = [
  CommonModule, SharedNavBarModule, SharedModule,
  MaterialModule, ReactiveFormsModule, NgxSkeletonLoaderModule,
];
@NgModule({
  declarations: [componentsList,],
  imports: [modulesList,],
})
export class CommDialogModule { }
