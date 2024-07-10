import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';
import { CoreRoutingModule } from './core.routing.module';
import { LandingComponent } from './pages/landing/landing.component';

const coreRoutes: Routes = []
const componentsList = [
  // SideBarComponent, RatingComponent,
  HeaderComponent, RatingComponent, FooterComponent, LandingComponent, 
];
const modulesList = [
  CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, 
  RouterModule.forChild(coreRoutes), CoreRoutingModule, 
];

@NgModule({
  declarations: [componentsList],
  imports: [modulesList,],
  exports: [CommonModule, componentsList]
})
export class CoreModule { }
