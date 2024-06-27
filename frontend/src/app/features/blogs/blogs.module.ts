import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { QuillModule } from 'ngx-quill';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { MaterialModule } from '../../shared/material.module';
import { BlogsRoutingModule } from './blogs.routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { WriteblogComponent } from './pages/writeblog/writeblog.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { EditblogComponent } from './pages/editblog/editblog.component';
import { MessageDialogComponent } from '../dialogs';
import { BlogBoxComponent } from './components/blog-box/blog-box.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogHeaderComponent } from './components/blog-header/blog-header.component';

const componentsList = [
  WriteblogComponent, MessageDialogComponent, BlogListComponent,
  BlogDetailComponent, EditblogComponent, 
  BlogBoxComponent, BlogCardComponent, BlogHeaderComponent
];

const modulesList = [
  CommonModule, BlogsRoutingModule, FormsModule, ReactiveFormsModule,
  QuillModule, MaterialModule, HttpClientModule,
  SweetAlert2Module, NgxSkeletonLoaderModule, SharedNavBarModule,
  CoreModule, SharedModule,
];

@NgModule({
  declarations: [componentsList,],
  imports: [modulesList],
  providers: [],
  exports: [],
})
export class BlogsModule { }
