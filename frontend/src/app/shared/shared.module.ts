import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { SwiperModule } from 'swiper/angular';

// import { CartTableComponent } from '../features/cart/component/cart-table/cart-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MessageComponent } from './dialogs/message/message.component';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

const sharedRoutes: Routes = [];
const componentsList = [ MessageDialogComponent, ConfirmDialogComponent ];
const moduleList = [
  FormsModule, ReactiveFormsModule, CommonModule,
  MaterialModule, SwiperModule,
]

@NgModule({
  declarations: [componentsList, ],
  imports: [
    moduleList, RouterModule.forChild(sharedRoutes),
  ],
  exports: [componentsList, moduleList, ]
})
export class SharedModule { }
