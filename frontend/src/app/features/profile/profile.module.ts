import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './main-profile-leftNav/main-profile.component';
import { MyblogComponent } from './myblog/myblog.component';
import { DraftComponent } from '../drafts/draft/draft.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../../shared/material.module';
import { EmailChangeDialogComponent, PasswordChangeDialogComponent } from '../dialogs';

const componentsList = [
  MainProfileComponent, MyblogComponent, DraftComponent,
  PasswordChangeDialogComponent, EmailChangeDialogComponent,
];
const modulesList = [
  CommonModule, ProfileRoutingModule, SharedNavBarModule,
  MaterialModule, ReactiveFormsModule, NgxSkeletonLoaderModule,
];
@NgModule({
  declarations: [componentsList,],
  imports: [modulesList,],
})
export class ProfileModule { }
