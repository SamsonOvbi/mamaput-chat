import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { QuillModule } from 'ngx-quill';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { MaterialModule } from '../../shared/material.module';

import { LandingComponent } from './pages/landing/landing.component';
import { WriteblogComponent } from './pages/writeblog/writeblog.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { EditblogComponent } from './pages/editblog/editblog.component';
import { EditdraftComponent } from '../drafts/editdraft/editdraft.component';
import { MessageDialogComponent } from '../dialogs';

const componentsList = [
  LandingComponent, WriteblogComponent, MessageDialogComponent, BlogListComponent,
  BlogDetailComponent, EditblogComponent, EditdraftComponent,
];

const modulesList = [
  CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule,
  QuillModule, MaterialModule, HttpClientModule,
  SweetAlert2Module, NgxSkeletonLoaderModule, SharedNavBarModule,
];

@NgModule({
  declarations: [componentsList,],
  imports: [modulesList],
  providers: [],
  exports: [],
})
export class MainModule { }
