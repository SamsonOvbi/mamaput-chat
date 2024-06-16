import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../core/landing/landing.component';
import { WriteblogComponent } from './blogs/writeblog/writeblog.component';
import { MaterialModule } from '../shared/MaterialModule/material.module';
import { DialogComponent } from './dialog';
import { ReadblogComponent } from './blogs/readblog/readblog.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReadSingleBlogComponent } from './blogs/read-single-blog/read-single-blog.component';
import { EditblogComponent } from './blogs/editblog/editblog.component';
import { EditdraftComponent } from './blogs/editdraft/editdraft.component';
import { QuillModule } from 'ngx-quill';
import { SharedNavBarModule } from './blogs/SharedNavBar/shard-navbar.module';

@NgModule({
  declarations: [
    LandingComponent,
    WriteblogComponent,
    DialogComponent,
    ReadblogComponent,
    ReadSingleBlogComponent,
    EditblogComponent,
    EditdraftComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MaterialModule,
    HttpClientModule,
    SweetAlert2Module,
    NgxSkeletonLoaderModule,
    SharedNavBarModule,
  ],
  providers: [],
  exports: [],
})
export class MainModule {}
