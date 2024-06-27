import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { NotLoadedComponent } from './components/notLoaded/not-loaded.component';

const sharedRoutes: Routes = [];
const componentsList = [ 
  MessageDialogComponent, ConfirmDialogComponent, NotLoadedComponent, 
];
const moduleList = [
  CommonModule, NgxSkeletonLoaderModule, MaterialModule, SwiperModule,
]

@NgModule({
  declarations: [componentsList, ],
  imports: [
    moduleList, RouterModule.forChild(sharedRoutes),
  ],
  exports: [componentsList, moduleList, ]
})
export class SharedModule { }
