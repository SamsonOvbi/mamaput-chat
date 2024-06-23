import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../../shared/material.module';

import { MyblogComponent } from './pages/myblog/myblog.component';
import { EmailChangeDialogComponent, PasswordChangeDialogComponent } from '../dialogs';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyDraftComponent } from './pages/myDraft/myDraft.component';

const componentsList = [
  ProfileComponent, MyblogComponent, MyDraftComponent,
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
