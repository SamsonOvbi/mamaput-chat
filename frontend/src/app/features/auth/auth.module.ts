import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.modulet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/MaterialModule/material.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordDialComponent } from '../dialog';
import { ResetpasswordComponent } from './forgotPassword/resetpassword.component';

@NgModule({
  declarations: [
    SignupComponent,
    ResetpasswordComponent,
    LoginComponent,
    ResetPasswordDialComponent,
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
