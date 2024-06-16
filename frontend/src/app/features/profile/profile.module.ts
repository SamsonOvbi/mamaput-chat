import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfileComponent } from './main-profile-leftNav/main-profile.component';
import { MyblogComponent } from '../blogs/myblog/myblog.component';
import { DraftComponent } from '../draft/draft.component';
import { ProfileComponent } from './user-details/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedNavBarModule } from '../blogs/SharedNavBar/shard-navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from '../../shared/MaterialModule/material.module';
import { EmailChangeDialogComponent, PasswordChangeDialogComponent } from '../dialogs';

@NgModule({
  declarations: [
    MainProfileComponent,
    MyblogComponent,
    DraftComponent,
    ProfileComponent,
    PasswordChangeDialogComponent,
    EmailChangeDialogComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedNavBarModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
})
export class ProfileModule { }
