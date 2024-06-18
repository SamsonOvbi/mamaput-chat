import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedNavBarModule } from '../../shared/shared-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../../shared/material.module';

import { MyblogComponent } from './myblog/myblog.component';
import { DraftComponent } from '../drafts/draft/draft.component';
import { EmailChangeDialogComponent, PasswordChangeDialogComponent } from '../dialogs';
import { ProfileComponent } from './profile/profile.component';

const componentsList = [
  ProfileComponent, MyblogComponent, DraftComponent,
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
