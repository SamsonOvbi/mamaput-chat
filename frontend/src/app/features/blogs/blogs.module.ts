import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { MaterialModule } from '../../shared/material.module';
import { BlogsRoutingModule } from './blogs.routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { WriteblogComponent } from './pages/writeblog/writeblog.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { EditblogComponent } from './pages/editblog/editblog.component';
import { DisplayBoxComponent } from './components/dispay-box/dispay-box.component';
import { DisplayCardComponent } from './components/dispay-card/dispay-card.component';
import { DisplayHeaderComponent } from './components/dispay-header/dispay-header.component';
import { WriteFormComponent } from './components/write-form/write-form.component';

const componentsList = [
  WriteblogComponent, BlogListComponent, BlogDetailComponent, EditblogComponent,
  DisplayBoxComponent, DisplayCardComponent, DisplayHeaderComponent,
  WriteFormComponent, 
];

const modulesList = [
  CommonModule, BlogsRoutingModule, FormsModule, ReactiveFormsModule,
  MaterialModule, HttpClientModule,
  SweetAlert2Module, NgxSkeletonLoaderModule, SharedNavBarModule,
  CoreModule, SharedModule, CKEditorModule,
];

@NgModule({
  declarations: [componentsList,],
  imports: [modulesList],
  providers: [],
  exports: [componentsList, modulesList, ]
})
export class BlogsModule { }
