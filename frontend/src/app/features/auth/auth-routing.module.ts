import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/forgotPassword/resetpassword.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ResetpasswordComponent, },
  { path: 'resetPassword/:token', component: PasswordResetComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
