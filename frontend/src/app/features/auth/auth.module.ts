import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './pages/forgot-password/resetpassword.component';

@NgModule({
  declarations: [
    SignupComponent,
    ResetPasswordComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
