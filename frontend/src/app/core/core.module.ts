import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../shared/MaterialModule/material.module';

const coreRoutes: Routes = []
const componentsList = [
  // HomeComponent, HeaderComponent, SideBarComponent, RatingComponent,
  HomeComponent, HeaderComponent, 
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
