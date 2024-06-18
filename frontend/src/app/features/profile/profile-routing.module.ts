import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DraftComponent } from '../drafts/draft/draft.component';
import { MyblogComponent } from './myblog/myblog.component';
import { AuthGuard } from '../auth/helpers/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'me', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'myblog', canActivate: [AuthGuard], component: MyblogComponent },
  { path: 'draft', canActivate: [AuthGuard], component: DraftComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
