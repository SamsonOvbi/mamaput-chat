import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full', }, 
  { path: 'landing', component: LandingComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuillModule], 
})
export class CoreRoutingModule { }
