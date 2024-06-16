import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { QuillModule } from 'ngx-quill';
import { SharedNavBarModule } from './SharedNavBar/shard-navbar.module';
import { MaterialModule } from '../../shared/MaterialModule/material.module';

import { LandingComponent } from './landing/landing.component';
import { WriteblogComponent } from './writeblog/writeblog.component';
import { ReadblogComponent } from './readblog/readblog.component';
import { ReadSingleBlogComponent } from './read-single-blog/read-single-blog.component';
import { EditblogComponent } from './editblog/editblog.component';
import { EditdraftComponent } from './editdraft/editdraft.component';
import { MessageDialogComponent } from '../dialogs';

const componentsList = [
  LandingComponent, WriteblogComponent, MessageDialogComponent, ReadblogComponent,
  ReadSingleBlogComponent, EditblogComponent, EditdraftComponent,
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
