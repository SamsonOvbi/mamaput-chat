import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { QuillModule } from 'ngx-quill';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { MaterialModule } from '../../shared/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { DraftsRoutingModule } from './drafts-routing.module';

import { EditdraftComponent } from '../drafts/pages/editdraft/editdraft.component';
import { DraftDetailComponent } from './pages/draft-detail/draft-detail.component';

const componentsList = [
  DraftDetailComponent, EditdraftComponent,
];

const modulesList = [
  CommonModule, DraftsRoutingModule, FormsModule, ReactiveFormsModule,
  QuillModule, MaterialModule, HttpClientModule,
  SweetAlert2Module, NgxSkeletonLoaderModule, SharedNavBarModule,
  CoreModule,
];

@NgModule({
  declarations: [componentsList,],
  imports: [modulesList],
  providers: [],
  exports: [],
})
export class DraftsModule { }
