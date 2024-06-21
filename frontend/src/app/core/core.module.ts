import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';

const coreRoutes: Routes = []
const componentsList = [
  // SideBarComponent, RatingComponent,
  HeaderComponent, RatingComponent, FooterComponent,
];
const modulesList = [
  CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, 
  RouterModule.forChild(coreRoutes),
];

@NgModule({
  declarations: [componentsList],
  imports: [modulesList,],
  exports: [CommonModule, componentsList]
})
export class CoreModule { }
